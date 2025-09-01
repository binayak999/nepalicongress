<template>
  <section>
    <v-container>
      <h1>Nepali Congress Policy Hackathon</h1>
      <v-row>
        <div>
          <ul class="tabs">
            <li
              v-for="(data, index) in tabs"
              :class="{ active: data == tab }"
              :key="index"
              @click="tab = data"
            >
              {{ data }}
            </li>
          </ul>
        </div>
      </v-row>
      <v-row>
        <div class="py-5" v-if="tab == 'About'">
          <p>
            Nepal's young population (between the age 18 to 40) accounts for
            40.68% of the total population. Despite having a substantial youth
            population, young people in Nepal find themselves excluded from
            meaningful participation in policy making processes. This lack of
            representation leads to policies that may not fully address the
            issues and concerns of the youth. At present, some policies don't
            address the needs and challenges faced by the young population of
            Nepal. This youth policy gap hinders holistic and sustainable
            development by depriving nations of the young population's talents,
            perspectives, and energy. To attain the shared prosperity which
            Nepali Congress dreamt of, it is indispensable to bridge this youth
            policy gap and ensure that youth are actively engaged, empowered,
            and included in policy-making and discussions. In order to bridge
            the gap between youth and policy making processes, Nepali Congress
            is organising a policy hackathon. This policy hackathon is a
            mechanism to harness the youth's energy, creativity, and insights.
          </p>
          <p>
            Nepali Congress Policy Hackathon is an event organised by the
            central office of Nepali Congress Party where participants will work
            together to create innovative solutions to pressing policy issues
            regarding the Gig Economy and Climate Action. Suggesting meaningful
            policy ideas includes brainstorming, problem-solving, and
            collaborative components. A team of 3-5 Nepali Individuals between
            the age of 18-40 from different backgrounds, including policy
            experts, political influencers, academicians, researchers,
            technologists, designers, and students, living in Nepal or abroad,
            can participate.
          </p>
          <div>
            <h2>Challenges</h2>
            <strong>This Years' Policy Hackathon has two challenges: </strong>
            <ol class="mt-3">
              <li>
                <strong> GIG Economy:</strong>
                <p>
                  The gig economy in Nepal is an emerging and evolving work
                  phenomenon driven by technology, changing attitudes towards
                  work, and economic factors. It involves short-term, freelance,
                  or project-based work facilitated through digital platforms.
                  In Nepal, ride sharing platforms like Pathao, food delivery
                  companies like Foodmandu, Bhoj are doing business. There are
                  other popular examples of physical or local gig economy jobs
                  which are pushing for more gig economy mediums. Nepali workers
                  also participate in the digital gig economy, which includes
                  platforms like Fiverr and Upwork where freelancers can offer
                  services such as graphic design and web development, online
                  consultations, and translation jobs to companies across the
                  globe. However, it can also pose challenges related to job
                  security, benefits, income stability, and regulatory
                  oversight, which has led to discussions about the need for
                  appropriate legal and policy frameworks to protect gig
                  workers' rights and address potential vulnerabilities. Your
                  policy paper can address any of the following challenges :
                </p>
                <ul class="mt-3">
                  <li>
                    - What is the current status of the Gig Economy in Nepal?
                    What are possibilities and challenges?
                  </li>
                  <li>
                    - How can Nepal address regulatory gaps and ensure labor's
                    protection in an evolving Gig Economy?
                  </li>
                  <li>
                    - How can Nepal bridge the technological gap/digital divide
                    and skill gaps to expand gig economy benefits throughout the
                    country?
                  </li>
                  <li>
                    - How can Nepal develop a comprehensive policy and legal
                    framework for fostering fair and ethical practices of the
                    Gig Economy?
                  </li>
                  <li>
                    - How can we harness the Gig economy's potential to enhance
                    skills and employability in Nepal's workforce?
                  </li>
                </ul>
              </li>
              <li>
                <strong>Climate Action: </strong>
                <p>
                  Nepal is one of the most vulnerable countries to the impacts
                  of climate change. Impacts of climate change are observed in
                  the form of prolonged drought or heavy cloudburst resulting in
                  floods, landslides and inundation. Extreme weather events
                  result in heat waves, forest fires and health hazards to all
                  the living beings and ecological environment. Climate actions
                  are inevitable in order to address the unique but
                  interconnected challenges posed to humanity due to climate
                  change. Taking proactive steps to mitigate the emissions,
                  adapt to changing conditions, and transitions to sustainable
                  practices is indispensable in the context of Nepal.
                </p>
                <p>
                  Your policy paper can address any of the following challenges:
                </p>
                <ul class="mt-3">
                  <li>
                    - How can Nepal strengthen Disaster Risk Reduction Policies
                    by addressing vulnerabilities and enhancing resilience?
                    Please consider the existing policy and institutional
                    mechanism, analyze the gap and propose your policy actions.
                  </li>
                  <li>
                    - How can Nepal transition from fossil fuels consumption to
                    renewable and clean energy? Consider the policy and
                    practice, analyze the gap and propose your policy actions.
                  </li>
                  <li>
                    - How can Nepal enhance Climate Finance Accessibility by
                    overcoming barriers and fostering effective implementation
                    strategies? Analyze the financial flow on climate action,
                    private sector involvement and international funding.
                  </li>
                  <li>
                    - What kind of capacity Nepal requires in order to enhance
                    ecosystem and community resilience so that climate actions
                    are implemented effectively at all levels. What are the
                    policy gaps and what is required in days to come?
                  </li>
                </ul>
              </li>
            </ol>
          </div>
          <div>
            <h2>Competition</h2>
            <strong>The competition has two stages: </strong>
            <ol class="mt-3">
              <li>
                <strong>Initial Stage: </strong>
                <p>
                  Applicants have to submit the policy paper on any one of the
                  two challenges. Policy Paper's length should be 3000 - 5,000
                  words. Applicants can submit policy papers in English or
                  Nepali language.
                </p>
              </li>
              <li>
                <strong> Final Stage: </strong>
                <p>
                  10 policy papers will be shortlisted and mentors will be
                  assigned to each team. These selected teams should give
                  presentations based on their written policy papers. Winners
                  will be declared after the evaluation by Judges.
                </p>
              </li>
            </ol>
          </div>
        </div>
        <div class="py-5" v-if="tab == 'Guidelines for Submission'">
          <div>
            <h2>Guidelines for Submission</h2>
            <strong>The competition has two stages: </strong>
            <ol class="mt-3">
              <li>
                <strong>Title and Summary:</strong> Begin with a clear and
                concise paper title and write the executive summary that
                provides a brief overview of the paper.
              </li>
              <li>
                <strong>Introduction:</strong> Include an introduction about the
                policy issue you are addressing and its significance.
              </li>
              <li>
                <strong>Problem Statement:</strong> Clearly define policy
                problems that your policy paper aims to address.
              </li>
              <li>
                <strong>Policy Objectives:</strong> State the specific goals you
                want to achieve through proposed policy.
              </li>
              <li>
                <strong>Main Body:</strong> Present a thorough analysis of the
                current situation including relevant data, research, and trends.
                Outline various policy and legal instruments that could address
                the problem in Nepal's context.
              </li>
              <li>
                <strong>Recommendation and Implementation Plan:</strong> : Based
                on your analysis, write the recommendation and describe how the
                recommended policy should be implemented. g. Conclusion:
                Summarise the key points of your paper.
              </li>
              <li>
                <strong>Conclusion:</strong> Summarise the key points of your
                paper.
              </li>
              <li>
                <strong>References:</strong> Properly cite all sources you've
                used.
              </li>
            </ol>
            <small
              ><strong
                >Note: : The content below 20% of plagiarism is acceptable, else
                it will be culminated as plagiarized and will be disqualified.
                The content generated with the assistance of AI will be
                disqualified. Paper's length should be 3000 - 5,000 words.
              </strong></small
            >
          </div>
        </div>
        <div class="py-5" v-if="tab == 'Prizes and Incentives'">
          <div>
            <h2>Prizes and Incentive</h2>
            <strong
              >Winning teams will receive cash prizes as mentioned below:
            </strong>
            <ol class="mt-3">
              <li><strong>Winner:</strong> NRs 3,00,000</li>
              <li><strong>First Runner up:</strong> NRs 1,50,000</li>
              <li><strong>Second Runner up:</strong> NRs 50,000</li>
            </ol>
            <small
              ><strong
                >Policy Papers of top three teams and best ideas will be
                presented to Nepali Congress. Those will be the part of
                discussion inside the parliamentary party of Nepali Congress.
              </strong></small
            >
          </div>
          <div>
            <h2>Evaluation Criteria</h2>
            <ol class="mt-3">
              <li>Originality</li>
              <li>Creativity</li>
              <li>Innovation</li>
              <li>Practicability in Nepal Context</li>
              <li>Presentation</li>
            </ol>
            <small
              ><strong
                >Policy Papers of top three teams and best ideas will be
                presented to Nepali Congress. Those will be the part of
                discussion inside the parliamentary party of Nepali Congress.
              </strong></small
            >
          </div>
        </div>
        <div class="py-5" v-if="tab == 'Timeline'">
          <div>
            <h2>Event Timeline</h2>
            <strong>The competition has two stages: </strong>
            <ul class="mt-3">
              <li>- August 12 (Shrawan 27): Application Opens</li>
              <li>- August 20 (Bhadra 3): Application Closes at 1 PM</li>
              <li>
                - August 22 (Bhadra 5): 10 teams will be selected for the Finale
              </li>
              <li>
                - August 26 (Bhadra 9): Finale at Nepali Congress Central
                Office, Sanepa, Lalitpur.
              </li>
            </ul>
          </div>
        </div>
        <div class="py-5" v-if="tab == 'FAQs'">
          <div>
            <h2>FAQs</h2>
            <strong
              >To assist interested participants with information, here are some
              clear and concise answers to FAQs
            </strong>
            <ol class="mt-3">
              <li>
                <strong> What is Nepali Congress Policy Hackathon?:</strong>
                <p>
                  Nepali Congress Policy Hackathon is an event organized by the
                  central office of Nepali Congress Party where participants
                  will work together to create innovative solutions to pressing
                  policy issues regarding the Gig Economy and Climate Action.
                  Suggesting meaningful policy ideas includes brainstorming,
                  problem-solving, and collaborative components.
                </p>
              </li>
              <li>
                <strong>Who can participate in the policy hackathon?</strong>
                <p>
                  A team of 3-5 Nepali Individuals from different backgrounds,
                  including policy experts, political influencers, academicians,
                  researchers, technologists, designers, and students, living
                  here or abroad, can participate.
                </p>
              </li>
              <li>
                <strong>When will the policy hackathon be held?</strong>
                <p>The Schedule for the policy hackathon is as follows:</p>
                <ul class="mt-3">
                  <li>- August 12 (Shrawan 27): Application Opens</li>
                  <li>- August 20 (Bhadra 3): Application Closes at 1 PM</li>
                  <li>
                    - August 22 (Bhadra 5): 10 teams will be selected for the
                    Finale
                  </li>
                  <li>
                    - August 26 (Bhadra 9): Finale at Nepali Congress Central
                    Office, Sanepa, Lalitpur.
                  </li>
                </ul>
              </li>
              <li>
                <strong>How do I register for the policy hackathon?</strong>
                <p>
                  Visit our event website or Nepali Congress official Facebook
                  page and complete the registration form after it opens on
                  Shrawan 27 (August 12) to sign up. Please include proper
                  contact information so we can update you on event details.
                  Please note the following things during registration:
                </p>
                <ul class="mt-3">
                  <li>
                    - Nepali citizens of below 40 in age with a team size of
                    three to five members can participate in the hackathon.
                  </li>
                  <li>
                    - Team Members can consist of Nepali Citizens living here or
                    abroad
                  </li>
                  <li>
                    - Participants participating from abroad, if selected for
                    the finals will get an opportunity to present online
                  </li>
                </ul>
              </li>
              <li>
                <strong
                  >Is there a registration fee for the Nepali Congress policy
                  hackathon?</strong
                >
                <p>
                  No, participation in the Nepali Congress policy hackathon is
                  free of charge.
                </p>
              </li>
              <li>
                <strong
                  >What challenges will be addressed in the hackathon?</strong
                >
                <p>Policy Hackathon will include the following two topics:</p>
                <ul class="mt-3">
                  <li>- GIG Economy</li>
                  <li>- Climate Action</li>
                </ul>
              </li>
              <li>
                <strong>Will there be mentors to guide participants?</strong>
                <p>
                  Yes, mentors will be assigned to the 10 selected teams.
                  Mentors will provide guidance, answer questions, and offer
                  insights to help teams refine their policy solutions.
                </p>
              </li>
              <li>
                <strong>What are the prizes for winning teams?</strong>
                <p>
                  Winning teams will receive cash prizes as mentioned below:
                </p>
                <ol class="mt-3">
                  <li><strong>Winner:</strong> NRs 3,00,000</li>
                  <li><strong>First Runner up:</strong> NRs 1,50,000</li>
                  <li><strong>Second Runner up:</strong> NRs 50,000</li>
                </ol>
                <p>
                  For further questions, please email
                  <a href="mailto:info@nepalicongress.org"
                    >info@nepalicongress.org</a
                  >
                </p>
              </li>
            </ol>
          </div>
        </div>
        <v-form class="py-5" v-if="tab == 'Form'">
          <h1>REGISTER FOR NEPALI CONGRESS POLICY HACKATHON</h1>
          <p>
            Thank you for your interest in registering for the 2023 Nepali
            Congress Policy Hackathon. This year's Hackathon will ask
            participants to create a policy solution to a specific problem in
            one of two areas:
          </p>
          <ul>
            <li>GIG Economy</li>
            <li>Climate Action</li>
          </ul>
          <p>
            Teams will be composed of 3-5 individuals. Interested participants
            have to sign up a full team.
          </p>
          <p>
            Regarding the individuals or team members residing abroad, Nepalis
            residing outside the country can also participate if they have 3
            members who can participate in the venue.
          </p>
          <p>
            Teams will submit a policy proposal and the top 10 teams will be
            selected to be judged by a panel of field and policy experts.
          </p>
          <ul>
            <li class="mb-3">Team Email</li>
            <li>
              <v-text-field
                v-model="teamEmail"
                placeholder="Team Email"
                outlined
              ></v-text-field>
            </li>
          </ul>
          <ul>
            <li class="mb-3">How many people are on your team?</li>
            <li>
              <v-radio-group v-model="teamSize" row>
                <v-radio label="3" value="3"></v-radio>
                <v-radio label="4" value="4"></v-radio>
                <v-radio label="5" value="5"></v-radio>
              </v-radio-group>
            </li>
          </ul>
          <h2>Team Member Information:</h2>
          <p>
            Please register the members of your team below, along with a team
            contact, who will be the primary liaison between your team and
            Hackathon coordinators.
          </p>
          <ul>
            <li class="mb-3">Team Contact</li>
            <li>
              <v-text-field
                v-model="teamContact"
                placeholder="Team Contact"
                outlined
              ></v-text-field>
            </li>
            <li>
              <v-text-field
                v-model="teamContactPhoneNo"
                placeholder="Team Contact Phone Number"
                outlined
              ></v-text-field>
            </li>
          </ul>
          <ul>
            <li>
              <strong> Team Leadership </strong>
              <p>
                Description: Team Coordinator will be coordinating with us for
                further procedure.
              </p>
            </li>
            <li class="mb-3">Full Name</li>
            <li class="mb-3">
              <v-text-field
                v-model="teamLeaderFullName"
                placeholder="Team Leader Full Name"
                outlined
              ></v-text-field>
            </li>
            <li class="mb-3">Email</li>
            <li>
              <v-text-field
                v-model="teamLeaderEmail"
                placeholder="Team Leader Email"
                outlined
              ></v-text-field>
            </li>
            <li class="mb-3">College or University or Organization</li>
            <li>
              <v-text-field
                v-model="teamLeaderCollege"
                placeholder="Team Leader College or University or Organization"
                outlined
              ></v-text-field>
            </li>
            <li class="mb-3">Place of Residence</li>
            <li>
              <v-text-field
                v-model="teamLeaderPlaceOfResidence"
                placeholder="Team Leader Place of Residence"
                outlined
              ></v-text-field>
            </li>
          </ul>
          <ul>
            <li class="mb-3"><strong>Team Member 2</strong></li>
            <li class="mb-3">Full Name</li>
            <li>
              <v-text-field
                v-model="team2LeaderFullName"
                placeholder="Team Member 2 Full Name"
                outlined
              ></v-text-field>
            </li>
            <li class="mb-3">Email</li>
            <li>
              <v-text-field
                v-model="team2LeaderEmail"
                placeholder="Team Member 2 Email"
                outlined
              ></v-text-field>
            </li>
            <li class="mb-3">College or University or Organization</li>
            <li>
              <v-text-field
                v-model="team2LeaderCollege"
                placeholder="Team Member 2 College or University or Organization"
                outlined
              ></v-text-field>
            </li>
            <li class="mb-3">Place of Residence</li>
            <li>
              <v-text-field
                v-model="team2LeaderPlaceOfResidence"
                placeholder="Team Member 2 Place of Residence"
                outlined
              ></v-text-field>
            </li>
          </ul>
          <ul>
            <li class="mb-3"><strong>Team Member 3</strong></li>
            <li class="mb-3">Full Name</li>
            <li>
              <v-text-field
                v-model="team3LeaderFullName"
                placeholder="Team Member 2 Full Name"
                outlined
              ></v-text-field>
            </li>
            <li class="mb-3">Email</li>
            <li>
              <v-text-field
                v-model="team3LeaderEmail"
                placeholder="Team Member 3 Email"
                outlined
              ></v-text-field>
            </li>
            <li class="mb-3">College or University or Organization</li>
            <li>
              <v-text-field
                v-model="team3LeaderCollege"
                placeholder="Team Member 3 College or University or Organization"
                outlined
              ></v-text-field>
            </li>
            <li class="mb-3">Place of Residence</li>
            <li>
              <v-text-field
                v-model="team3LeaderPlaceOfResidence"
                placeholder="Team Member 3 Place of Residence"
                outlined
              ></v-text-field>
            </li>
          </ul>
          <ul>
            <li class="mb-3"><strong>Team Member 4</strong></li>
            <li class="mb-3">Full Name</li>
            <li>
              <v-text-field
                v-model="team4LeaderFullName"
                placeholder="Team Member 4 Full Name"
                outlined
              ></v-text-field>
            </li>
            <li class="mb-3">Email</li>
            <li>
              <v-text-field
                v-model="team4LeaderEmail"
                placeholder="Team Member 4 Email"
                outlined
              ></v-text-field>
            </li>
            <li class="mb-3">College or University or Organization</li>
            <li>
              <v-text-field
                v-model="team4LeaderCollege"
                placeholder="Team Member 4 College or University or Organization"
                outlined
              ></v-text-field>
            </li>
            <li class="mb-3">Place of Residence</li>
            <li>
              <v-text-field
                v-model="team4LeaderPlaceOfResidence"
                placeholder="Team Member 4 Place of Residence"
                outlined
              ></v-text-field>
            </li>
          </ul>
          <ul>
            <li class="mb-3"><strong>Team Member 5</strong></li>
            <li class="mb-3">Full Name</li>
            <li>
              <v-text-field
                v-model="team5LeaderFullName"
                placeholder="Team Member 4 Full Name"
                outlined
              ></v-text-field>
            </li>
            <li class="mb-3">Email</li>
            <li>
              <v-text-field
                v-model="team5LeaderEmail"
                placeholder="Team Member 5 Email"
                outlined
              ></v-text-field>
            </li>
            <li class="mb-3">College or University or Organization</li>
            <li>
              <v-text-field
                v-model="team5LeaderCollege"
                placeholder="Team Member 5 College or University or Organization"
                outlined
              ></v-text-field>
            </li>
            <li class="mb-3">Place of Residence</li>
            <li>
              <v-text-field
                v-model="team5LeaderPlaceOfResidence"
                placeholder="Team Member 5 Place of Residence"
                outlined
              ></v-text-field>
            </li>
          </ul>
          <h2>Registration Information:</h2>
          <ul>
            <li class="mb-3">
              What topic would your team like to register for? (One among two)
            </li>
            <li class="mb-3">
              <v-radio-group v-model="topic">
                <v-radio label="Gig Economy" value="gigeconomy"></v-radio>
                <v-radio label="Climate Action" value="climateaction"></v-radio>
              </v-radio-group>
            </li>
            <li class="mb-3">
              What is the idea of team…? Present the concept paper of words
              2500-4000
            </li>
            <li class="mb-3">
              <v-file-input
                label="Idea"
                :chips="true"
                :show-size="true"
                outlined
                v-model="ideaFile"
                accept=".doc, .docx"
                required
                prepend-icon="mdi-file-document"
              ></v-file-input>
            </li>
            <li class="mb-3">
              What challenge / problem does it address? (Implicitly and
              Explicitly). Present it in bullets.
            </li>
            <li class="mb-3">
              <v-textarea
                v-model="challenge"
                placeholder="What challenge / problem does it address? (Implicitly and Explicitly). Present it in bullets. - (enter)"
                outlined
              ></v-textarea>
            </li>
            <li class="mb-3">Why do you want to take part in the hack?</li>
            <li>
              <v-text-field
                v-model="whyHack"
                placeholder="Why do you want to take part in the hack?"
                outlined
              ></v-text-field>
            </li>
            <li class="mb-3">What describes your team best?</li>
            <li>
              <v-selection
                class="selectdate"
                v-model="bestOn"
                :options="bestList"
                :filterable="true"
              ></v-selection>
            </li>
            <li>
              . If you have any further queries, please feel free to communicate
              with us.
            </li>
          </ul>
          <v-btn class="mb-5 submitBtn" @click="submitForm">Save</v-btn>
        </v-form>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Hackthon",
  data() {
    return {
      bestList: [
        "Risk-Takers",
        "Observant",
        "Networker",
        "Reflective",
        "Creator",
        "Problem Finder",
        "Empathetic",
        "Resilient",
      ],
      teamEmail: "",
      teamSize: "",
      teamContact: "",
      teamContactPhoneNo: "",
      teamLeaderEmail: "",
      teamLeaderCollege: "",
      teamLeaderPlaceOfResidence: "",
      teamLeaderFullName: "",
      team2LeaderFullName: "",
      team2LeaderEmail: "",
      team2LeaderCollege: "",
      team2LeaderPlaceOfResidence: "",
      team3LeaderFullName: "",
      team3LeaderEmail: "",
      team3LeaderCollege: "",
      team3LeaderPlaceOfResidence: "",
      team4LeaderFullName: "",
      team4LeaderEmail: "",
      team4LeaderCollege: "",
      team4LeaderPlaceOfResidence: "",
      team5LeaderFullName: "",
      team5LeaderEmail: "",
      team5LeaderCollege: "",
      team5LeaderPlaceOfResidence: "",
      topic: "",
      ideaFile: undefined,
      challenge: "",
      whyHack: "",
      bestOn: "",
      tab: "About",
      tabs: [
        "About",
        "Timeline",
        "Guidelines for Submission",
        "Prizes and Incentives",
        "FAQs",
        "Form",
      ],
    };
  },
  methods: {
    ...mapActions(["postHackton"]),
    async submitForm() {
      const formData = new FormData();
      formData.append("teamEmail", this.teamEmail);
      formData.append("teamSize", this.teamSize);
      formData.append("teamContact", this.teamContact);
      formData.append("teamContactPhoneNo", this.teamContactPhoneNo);
      formData.append("teamLeaderEmail", this.teamLeaderEmail);
      formData.append("teamLeaderCollege", this.teamLeaderCollege);
      formData.append(
        "teamLeaderPlaceOfResidence",
        this.teamLeaderPlaceOfResidence
      );
      formData.append("teamLeaderFullName", this.teamLeaderFullName);
      formData.append("team2LeaderFullName", this.team2LeaderFullName);
      formData.append("team2LeaderEmail", this.team2LeaderEmail);
      formData.append("team2LeaderCollege", this.team2LeaderCollege);
      formData.append(
        "team2LeaderPlaceOfResidence",
        this.team2LeaderPlaceOfResidence
      );
      formData.append("team3LeaderFullName", this.team3LeaderFullName);
      formData.append("team3LeaderEmail", this.team3LeaderEmail);
      formData.append("team3LeaderCollege", this.team3LeaderCollege);
      formData.append(
        "team3LeaderPlaceOfResidence",
        this.team3LeaderPlaceOfResidence
      );
      formData.append("team4LeaderFullName", this.team4LeaderFullName);
      formData.append("team4LeaderEmail", this.team4LeaderEmail);
      formData.append("team4LeaderCollege", this.team4LeaderCollege);
      formData.append(
        "team4LeaderPlaceOfResidence",
        this.team4LeaderPlaceOfResidence
      );
      formData.append("team5LeaderFullName", this.team5LeaderFullName);
      formData.append("team5LeaderEmail", this.team5LeaderEmail);
      formData.append("team5LeaderCollege", this.team5LeaderCollege);
      formData.append(
        "team5LeaderPlaceOfResidence",
        this.team5LeaderPlaceOfResidence
      );
      formData.append("topic", this.topic);
      formData.append("ideaFile", this.ideaFile);
      formData.append("challenge", this.challenge);
      formData.append("whyHack", this.whyHack);
      formData.append("bestOn", this.bestOn);
      await this.postHackton(formData);
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 20px;
}
.submitBtn {
  background: $secondary !important;
  color: #fff;
}
.tabs {
  list-style: none;
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;
  .active {
    background: green;
    color: #fff;
  }
  li {
    padding: 10px 25px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-right: 10px;
    cursor: pointer;
    margin-bottom: 10px;
    @media only screen and (max-width: 768px) {
      width: 50%;
      margin-right: 0;
      text-align: center;
    }
  }
}
</style>