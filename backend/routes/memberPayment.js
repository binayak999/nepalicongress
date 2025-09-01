const express = require("express");
const router = express.Router();
const Circular = require("../model/Circular");
const MemberPayment = require("../model/MemberPayment");
const verifyAppToken = require("../middleware/verifyAppToken");
const Subdomain = require("../model/Subdomain");

// Get payment details by circular working form number
router.post("/getPaymentDetails", verifyAppToken, async (req, res) => {
  try {
    const { workingFormNumber } = req.body;
    const currentYear = new Date().getFullYear();

    if (!workingFormNumber) {
      return res.status(400).send({
        message: "Working form number is required",
        results: {},
      });
    }

    // Find the circular by working form number
    const circular = await Circular.findOne({
      workingformnumber: workingFormNumber,
    });
    if (!circular) {
      return res.status(404).send({
        message: "Circular not found",
        results: {},
      });
    }

    // Find the latest payment record for this circular
    const payment = await MemberPayment.findOne({
      circularId: circular._id,
    }).sort({ createdAt: -1 });

    // Determine currency type based on working form number
    const currencyType = workingFormNumber.startsWith("80") ? "USD" : "NPR";

    // Set default current due based on currency type
    const defaultCurrentDue = currencyType === "USD" ? 30 : 300;

    // Calculate total due and current due
    let totalDue;
    let currentDue;
    let previousDue = 0;
    let lastPaymentYear = null;
    let yearsUnpaid = 0;
    let advancePayment = payment ? payment.advancePayment : 0;

    if (payment) {
      // Get the year of the last payment (prioritize paidDate over paymentYear)
      if (payment.paidDate) {
        lastPaymentYear = new Date(payment.paidDate).getFullYear();
      } else {
        lastPaymentYear = payment.paymentYear || currentYear - 1;
      }

      // Calculate how many years have passed since the last payment
      yearsUnpaid = currentYear - lastPaymentYear;

      // Current year's due is always the standard amount
      currentDue = defaultCurrentDue;

      // Calculate previous dues for all unpaid years (excluding current year)
      if (yearsUnpaid > 1) {
        // Years between last payment and current year (excluding current)
        previousDue = defaultCurrentDue * (yearsUnpaid - 1);
      }

      // Calculate total due (previous + current - advance)
      totalDue = previousDue + currentDue;

      // Deduct any advance payment from the total
      if (advancePayment > 0) {
        totalDue = totalDue - advancePayment;
      }

      // If this is the current year and already paid, set dues to 0
      if (yearsUnpaid < 1 && payment.isPaid) {
        currentDue = 0;
        previousDue = 0;
        totalDue = -advancePayment; // Only show negative for advance
      }
    } else {
      // For new members, only current year's due
      totalDue = defaultCurrentDue;
      currentDue = defaultCurrentDue;
    }

    // Prepare response data
    const responseData = {
      circularDetails: {
        workingFormNumber: circular.workingformnumber,
        membername: circular.membername,
      },
      paymentDetails: {
        previousDue: previousDue,
        currentDue: currentDue,
        advancePayment: advancePayment,
        totalDue: totalDue,
        isPaid: payment ? payment.isPaid : false,
        paidDate: payment ? payment.paidDate : null,
        paymentStatus: totalDue <= 0 ? "PAID" : "DUE",
        hasAdvancePayment: advancePayment > 0,
        currencyType: payment ? payment.currencyType : currencyType,
        nextPaymentDate:
          payment && payment.paidDate
            ? new Date(
                new Date(payment.paidDate).setFullYear(
                  new Date(payment.paidDate).getFullYear() + 1
                )
              )
            : null,
        yearsUnpaid: yearsUnpaid,
        lastPaymentYear: lastPaymentYear,
      },
    };

    return res.status(200).send({
      message: "Payment details retrieved successfully",
      results: responseData,
    });
  } catch (error) {
    console.error("Error in getPaymentDetails:", error);
    return res.status(500).send({
      message: "Error fetching payment details",
      results: { error: error.message },
    });
  }
});

// Tokenized filter circular admin endpoint
router.post("/filterMember", verifyAppToken, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      country,
      mainDistrict,
    } = req.body;

    // Build query
    const query = {};

    // Filter by country
    if (country) {
      query["country"] = country;
    }

    // Filter by mainDistrict
    if (mainDistrict) {
      query["mainDistrict"] = mainDistrict;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    // Execute query with pagination and sorting
    const [members, total] = await Promise.all([
      Circular.find(query, {
        workingformnumber: 1,
        membername: 1,
        country: 1,
        _id: 0,
      })
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Circular.countDocuments(query),
    ]);

    // Log the access
    console.log(
      `App ${req.appCredentials.appId} accessed member filter at ${new Date()}`
    );

    return res.status(200).send({
      message: "Members filtered successfully",
      results: {
        members,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Error in filterMember:", error);
    return res.status(500).send({
      message: "Error filtering members",
      results: { error: error.message },
    });
  }
});

router.post("/addPayment", verifyAppToken, async (req, res) => {
  try {
    const {
      workingFormNumber,
      amount,
      paymentMethod = "CASH",
      paymentReference,
      remarks,
    } = req.body;
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();

    if (!workingFormNumber || !amount) {
      return res.status(400).send({
        message: "Working form number and amount are required",
        results: {},
      });
    }

    // Find the circular by working form number
    const circular = await Circular.findOne({
      workingformnumber: workingFormNumber,
    });
    if (!circular) {
      return res.status(404).send({
        message: "Circular not found",
        results: {},
      });
    }

    // Find the latest payment record for this circular
    const lastPayment = await MemberPayment.findOne({
      circularId: circular._id,
    }).sort({ createdAt: -1 });

    // Check if payment was already made in the current calendar year
    if (lastPayment && lastPayment.isPaid) {
      const lastPaymentYear = lastPayment.paidDate
        ? new Date(lastPayment.paidDate).getFullYear()
        : null;

      if (lastPaymentYear === currentYear) {
        const nextPaymentDate = new Date(currentDate);
        nextPaymentDate.setFullYear(nextPaymentDate.getFullYear() + 1);
        nextPaymentDate.setMonth(0, 1); // Set to January 1st of next year

        return res.status(400).send({
          message: "Payment already made for this calendar year",
          results: {
            circularDetails: {
              workingFormNumber,
              membername: circular.membername,
            },
            paymentDetails: {
              lastPaymentDate: lastPayment.paidDate,
              nextPaymentDate: nextPaymentDate,
              daysRemaining: Math.ceil(
                (nextPaymentDate - currentDate) / (1000 * 60 * 60 * 24)
              ),
              isPaid: lastPayment.isPaid,
            },
          },
        });
      }
    }

    // Determine currency type and standard amount based on working form number
    const currencyType = workingFormNumber.startsWith("80") ? "USD" : "NPR";
    const standardAmount = currencyType === "USD" ? 30 : 300;

    // ---- STEP 1: Calculate dues based on year gap ----
    let previousDue = 0;
    let currentDue = standardAmount;
    let existingAdvance = 0;
    let yearsUnpaid = 0;

    if (lastPayment) {
      // Get the year of the last payment
      const lastPaymentYear = lastPayment.paidDate
        ? new Date(lastPayment.paidDate).getFullYear()
        : lastPayment.paymentYear || currentYear - 1;

      // Calculate years gap between last payment and now
      yearsUnpaid = currentYear - lastPaymentYear;

      // Get existing advance amount
      existingAdvance = lastPayment.advancePayment || 0;

      // If paid in current year, no dues
      if (yearsUnpaid < 1 && lastPayment.isPaid) {
        currentDue = 0;
        previousDue = 0;
      }
      // If more than 1 year gap, calculate previous dues
      else if (yearsUnpaid > 1) {
        previousDue = standardAmount * (yearsUnpaid - 1);
      }
    }

    // ---- STEP 2: Calculate gross due and apply existing advance ----
    const grossDue = previousDue + currentDue;
    let netDue = grossDue;

    // Apply existing advance to reduce net due
    if (existingAdvance > 0) {
      netDue = Math.max(0, grossDue - existingAdvance);
    }

    // ---- NEW: MINIMUM PAYMENT VALIDATION ----
    // Check if payment amount is sufficient to cover the net due
    if (netDue > 0 && amount < netDue) {
      return res.status(400).send({
        message: "Insufficient payment amount",
        results: {
          circularDetails: {
            workingFormNumber,
            membername: circular.membername,
          },
          paymentDetails: {
            requiredAmount: netDue,
            providedAmount: amount,
            shortfall: netDue - amount,
            currencyType,
            existingAdvance,
            breakdown: {
              previousDue,
              currentDue,
              grossDue,
              netDue,
            },
          },
        },
      });
    }

    // ---- STEP 3: Process the payment ----
    let paymentUsed = 0;
    let newAdvance = 0;
    let finalPreviousDue = previousDue;
    let finalCurrentDue = currentDue;

    // Case 1: Payment + existing advance covers everything
    if (amount + existingAdvance >= grossDue) {
      // Clear all dues
      finalPreviousDue = 0;
      finalCurrentDue = 0;

      // Calculate how much of the payment was actually used
      paymentUsed = Math.min(amount, netDue);

      // Calculate new advance
      // existingAdvance used = min(existingAdvance, grossDue)
      const existingAdvanceUsed = Math.min(existingAdvance, grossDue);
      const remainingAdvance = existingAdvance - existingAdvanceUsed;

      // New advance = remaining old advance + unused portion of new payment
      newAdvance = remainingAdvance + (amount - paymentUsed);
    }
    // Case 2: Payment + existing advance partially covers dues
    else {
      // Use the existing advance first
      const remainingDueAfterAdvance = netDue;

      // Then apply payment to the remaining due
      if (amount >= remainingDueAfterAdvance) {
        // Clear all remaining dues
        finalPreviousDue = 0;
        finalCurrentDue = 0;

        // All payment was used (and maybe some existing advance)
        paymentUsed = remainingDueAfterAdvance;

        // New advance = unused portion of new payment
        newAdvance = amount - paymentUsed;
      } else {
        // Cannot clear all dues even with payment
        paymentUsed = amount;

        // Apply payment first to previous due
        if (finalPreviousDue > 0) {
          if (paymentUsed >= finalPreviousDue) {
            // Clear previous due
            const remainingPayment = paymentUsed - finalPreviousDue;
            finalPreviousDue = 0;

            // Apply remainder to current due
            finalCurrentDue = Math.max(0, finalCurrentDue - remainingPayment);
          } else {
            // Partial payment of previous due
            finalPreviousDue -= paymentUsed;
          }
        } else {
          // Apply all to current due
          finalCurrentDue = Math.max(0, finalCurrentDue - paymentUsed);
        }

        // No new advance since all payment was used
        newAdvance = 0;
      }
    }

    // ---- STEP 4: Calculate final values ----
    const finalDue = finalPreviousDue + finalCurrentDue;
    const finalTotalDue = newAdvance > 0 ? -newAdvance : finalDue;
    const isPaid = finalDue === 0;

    // ---- STEP 5: Create payment record ----
    const payment = new MemberPayment({
      circularId: circular._id,
      previousDue, // Keep original previous due amount
      currentDue, // Keep original current due amount
      paymentAmount: amount, // Add the actual payment amount made by user
      advancePayment: newAdvance,
      advancePaymentDate: newAdvance > 0 ? currentDate : null,
      advancePaymentReference: newAdvance > 0 ? paymentReference : null,
      isPaid,
      paidDate: currentDate,
      paymentMethod,
      paymentReference,
      paymentYear: currentYear,
      paymentMonth: currentDate.getMonth() + 1,
      remarks,
      currencyType,
      createdBy: req.appCredentials.appId,
      creatorType: "APP",
    });

    await payment.save();

    // Determine appropriate status code and message based on payment outcome
    let statusCode = 201;
    let statusMessage = "Payment added successfully";

    if (newAdvance > 0) {
      // Payment exceeded dues - advance created
      statusCode = 201;
      statusMessage = "Payment successful with advance credit created";
    } else if (finalDue === 0) {
      // Exact payment - all dues cleared
      statusCode = 200;
      statusMessage = "Payment successful - all dues cleared";
    } else if (finalDue > 0) {
      // Partial payment - some dues still remaining
      statusCode = 202;
      statusMessage = "Partial payment accepted - dues remaining";
    }

    return res.status(statusCode).send({
      message: statusMessage,
      results: {
        circularDetails: {
          workingFormNumber,
          membername: circular.membername,
        },
        paymentDetails: {
          previousDue, // Keep original previous due amount
          currentDue, // Keep original current due amount
          totalDue: previousDue + currentDue, // Show total original due
          paymentAmount: amount, // Actual payment amount
          advancePayment: newAdvance,
          remainingDue: finalDue, // Show remaining due after payment
          netBalance: finalTotalDue, // Net balance (negative if advance, positive if still owed)
          isPaid,
          paidDate: payment.paidDate,
          paymentStatus: isPaid ? "PAID" : "PARTIAL",
          hasAdvancePayment: newAdvance > 0,
          currencyType: payment.currencyType,
          nextPaymentDate: payment.paidDate
            ? new Date(
                new Date(payment.paidDate).setFullYear(
                  new Date(payment.paidDate).getFullYear() + 1
                )
              )
            : null,
          yearsUnpaid,
          createdBy: {
            id: payment.createdBy,
            type: payment.creatorType,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error in addPayment:", error);
    return res.status(500).send({
      message: "Error adding payment",
      results: { error: error.message },
    });
  }
});

// get all subdomain
router.get("/getCountry", verifyAppToken, async (req, res) => {
  try {
    const subdomains = await Subdomain.find(
      {
        category: "Nepalese People's Co-ordination Committee",
        city: { $ne: "0" },
      },
      {
        _id: 0,
        name: 1,
        subdomain: 1,
      }
    );
    return res.status(200).send({
      message: "Subdomains fetched successfully",
      results: subdomains,
    });
  } catch (error) {
    console.error("Error in getAllSubdomain:", error);
  }
});

module.exports = router;
