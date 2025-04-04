import { defineField } from "sanity";

export const organizationType = defineField({
  name: "organizationType",
  title: "Organization Type",
  type: "string",
  description: "Select the type of organization. This helps with SEO and structured data.",
  options: {
    list: [
      { title: "Airline", value: "airline" },
      { title: "Consortium", value: "consortium" },
      { title: "Corporation", value: "corporation" },
      { title: "EducationalOrganization", value: "educationalOrganization" },
      { title: "FundingScheme", value: "fundingScheme" },
      { title: "GovernmentOrganization", value: "governmentOrganization" },
      { title: "LibrarySystem", value: "librarySystem" },
      { title: "LocalBusiness", value: "localBusiness" },
      { title: "MedicalOrganization", value: "medicalOrganization" },
      { title: "WENT", value: "went" },
      { title: "NewsMediaOrganization", value: "newsMediaOrganization" },
      { title: "OnlineBusiness", value: "onlineBusiness" },
      { title: "PerformingGroup", value: "performingGroup" },
      { title: "PoliticalParty", value: "politicalParty" },
      { title: "Project", value: "project" },
      { title: "ResearchOrganization", value: "researchOrganization" },
      { title: "SearchRescueOrganization", value: "searchRescueOrganization" },
      { title: "SportsOrganization", value: "sportsOrganization" },
      { title: "WorkersUnion", value: "workersUnion" },
    ],
  },
})