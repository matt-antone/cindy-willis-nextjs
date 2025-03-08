import { defineField } from "sanity";

export const localBusinessType = defineField({
  type: "string",
  name: "businessType",
  title: "Business Type",
  description: "Select the type of business",
  options: {
    list: [
      { title: "Animal Shelter", value: "AnimalShelter" },
      { title: "Archive Organization", value: "ArchiveOrganization" },
      { title: "Automotive Business", value: "AutomotiveBusiness" },
      { title: "Child Care", value: "ChildCare" },
      { title: "Dentist", value: "Dentist" },
      { title: "Dry Cleaning or Laundry", value: "DryCleaningOrLaundry" },
      { title: "Electrician", value: "Electrician" },
      { title: "Emergency Service", value: "EmergencyService" },
      { title: "Employment Agency", value: "EmploymentAgency" },
      { title: "Entertainment Business", value: "EntertainmentBusiness" },
      { title: "Financial Service", value: "FinancialService" },
      { title: "Food Establishment", value: "FoodEstablishment" },
      { title: "Government Office", value: "GovernmentOffice" },
      { title: "Health and Beauty Business", value: "HealthAndBeautyBusiness" },
      {
        title: "Home and Construction Business",
        value: "HomeAndConstructionBusiness",
      },
      { title: "Internet Cafe", value: "InternetCafe" },
      { title: "Legal Service", value: "LegalService" },
      { title: "Library", value: "Library" },
      { title: "Lodging Business", value: "LodgingBusiness" },
      { title: "Medical Business", value: "MedicalBusiness" },
      { title: "Professional Service", value: "ProfessionalService" },
      { title: "Radio Station", value: "RadioStation" },
      { title: "Real Estate Agent", value: "RealEstateAgent" },
      { title: "Recycling Center", value: "RecyclingCenter" },
      { title: "Self Storage", value: "SelfStorage" },
      { title: "Shopping Center", value: "ShoppingCenter" },
      { title: "Sports Activity Location", value: "SportsActivityLocation" },
      { title: "Store", value: "Store" },
      { title: "Television Station", value: "TelevisionStation" },
      {
        title: "Tourist Information Center",
        value: "TouristInformationCenter",
      },
      { title: "Travel Agency", value: "TravelAgency" },
    ],
  },
});
