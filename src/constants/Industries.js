
const INDUSTRIES = [
    {
        value: 1,
        label: "Accounting"
    },
    {
        value: 2,
        label: "Airlines/Aviation"
    },
    {
        value: 3,
        label: "Alternative Dispute Resolution"
    },
    {
        value: 4,
        label: "Alternative Medicine"
    },
    {
        value: 5,
        label: "Animation"
    },
    {
        value: 6,
        label: "Apparel & Fashion"
    },
    {
        value: 7,
        label: "Architecture & Planning"
    },
    {
        value: 8,
        label: "Arts and Crafts"
    },
    {
        value: 9,
        label: "Automotive"
    },
    {
        value: 10,
        label: "Aviation & Aerospace"
    },
    {
        value: 11,
        label: "Banking"
    },
    {
        value: 12,
        label: "Biotechnology"
    },
    {
        value: 13,
        label: "Broadcast Media"
    },
    {
        value: 14,
        label: "Building Materials"
    },
    {
        value: 15,
        label: "Business Supplies and Equipment"
    },
    {
        value: 16,
        label: "Capital Markets"
    },
    {
        value: 17,
        label: "Chemicals"
    },
    {
        value: 18,
        label: "Civic & Social Organization"
    },
    {
        value: 19,
        label: "Civil Engineering"
    },
    {
        value: 20,
        label: "Commercial Real Estate"
    },
    {
        value: 21,
        label: "Computer & Network Security"
    },
    {
        value: 22,
        label: "Computer Games"
    },
    {
        value: 23,
        label: "Computer Hardware"
    },
    {
        value: 24,
        label: "Computer Networking"
    },
    {
        value: 25,
        label: "Computer Software"
    },
    {
        value: 26,
        label: "Construction"
    },
    {
        value: 27,
        label: "Consumer Electronics"
    },
    {
        value: 28,
        label: "Crypto"
    },
    {
        value: 29,
        label: "Consumer Goods"
    },
    {
        value: 30,
        label: "Consumer Services"
    },
    {
        value: 31,
        label: "Cosmetics"
    },
    {
        value: 32,
        label: "Dairy"
    },
    {
        value: 33,
        label: "Defense & Space"
    },
    {
        value: 34,
        label: "Design"
    },
    {
        value: 35,
        label: "Edtech"
    },
    {
        value: 36,
        label: "Education Management"
    },
    {
        value: 37,
        label: "E-Learning"
    },
    {
        value: 38,
        label: "Electrical/Electronic Manufacturing"
    },
    {
        value: 39,
        label: "Entertainment"
    },
    {
        value: 40,
        label: "Environmental Services"
    },
    {
        value: 41,
        label: "Events Services"
    },
    {
        value: 42,
        label: "Executive Office"
    },
    {
        value: 43,
        label: "Facilities Services"
    },
    {
        value: 44,
        label: "Farming"
    },
    {
        value: 45,
        label: "Financial Services"
    },
    {
        value: 46,
        label: "Fine Art"
    },
    {
        value: 47,
        label: "Fishery"
    },
    {
        value: 48,
        label: "Food & Beverages"
    },
    {
        value: 49,
        label: "Food Production"
    },
    {
        value: 50,
        label: "Fund-Raising"
    },
    {
        value: 51,
        label: "Furniture"
    },
    {
        value: 52,
        label: "Gambling & Casinos"
    },
    {
        value: 53,
        label: "Glass, Ceramics & Concrete"
    },
    {
        value: 54,
        label: "Government Administration"
    },
    {
        value: 55,
        label: "Government Relations"
    },
    {
        value: 56,
        label: "Graphic Design"
    },
    {
        value: 57,
        label: "Health, Wellness and Fitness"
    },
    {
        value: 58,
        label: "Higher Education"
    },
    {
        value: 59,
        label: "Hospital & Health Care"
    },
    {
        value: 60,
        label: "Hospitality"
    },
    {
        value: 61,
        label: "Human Resources"
    },
    {
        value: 62,
        label: "Import and Export"
    },
    {
        value: 63,
        label: "Individual & Family Services"
    },
    {
        value: 64,
        label: "Industrial Automation"
    },
    {
        value: 65,
        label: "Information Services"
    },
    {
        value: 66,
        label: "Information Technology and Services"
    },
    {
        value: 67,
        label: "Insurance"
    },
    {
        value: 68,
        label: "International Affairs"
    },
    {
        value: 69,
        label: "International Trade and Development"
    },
    {
        value: 70,
        label: "Internet"
    },
    {
        value: 71,
        label: "Investment Banking"
    },
    {
        value: 72,
        label: "Investment Management"
    },
    {
        value: 73,
        label: "Judiciary"
    },
    {
        value: 74,
        label: "Law Enforcement"
    },
    {
        value: 75,
        label: "Law Practice"
    },
    {
        value: 76,
        label: "Legal Services"
    },
    {
        value: 77,
        label: "Legislative Office"
    },
    {
        value: 78,
        label: "Leisure, Travel & Tourism"
    },
    {
        value: 79,
        label: "Libraries"
    },
    {
        value: 80,
        label: "Logistics and Supply Chain"
    },
    {
        value: 81,
        label: "Luxury Goods & Jewelry"
    },
    {
        value: 82,
        label: "Machinery"
    },
    {
        value: 83,
        label: "Management Consulting"
    },
    {
        value: 84,
        label: "Maritime"
    },
    {
        value: 85,
        label: "Marketing and Advertising"
    },
    {
        value: 86,
        label: "Market Research"
    },
    {
        value: 87,
        label: "Mechanical or Industrial Engineering"
    },
    {
        value: 88,
        label: "Media Production"
    },
    {
        value: 89,
        label: "Medical Devices"
    },
    {
        value: 90,
        label: "Medical Practice"
    },
    {
        value: 91,
        label: "Mental Health Care"
    },
    {
        value: 92,
        label: "Military"
    },
    {
        value: 93,
        label: "Mining & Metals"
    },
    {
        value: 94,
        label: "Motion Pictures and Film"
    },
    {
        value: 95,
        label: "Museums and Institutions"
    },
    {
        value: 96,
        label: "Music"
    },
    {
        value: 97,
        label: "Nanotechnology"
    },
    {
        value: 98,
        label: "Newspapers"
    },
    {
        value: 99,
        label: "Nonprofit Organization Management"
    },
    {
        value: 100,
        label: "Oil & Energy"
    },
    {
        value: 101,
        label: "Online Media"
    },
    {
        value: 102,
        label: "Outsourcing/Offshoring"
    },
    {
        value: 103,
        label: "Package/Freight Delivery"
    },
    {
        value: 104,
        label: "Packaging and Containers"
    },
    {
        value: 105,
        label: "Paper & Forest Products"
    },
    {
        value: 106,
        label: "Performing Arts"
    },
    {
        value: 107,
        label: "Pharmaceuticals"
    },
    {
        value: 108,
        label: "Philanthropy"
    },
    {
        value: 109,
        label: "Photography"
    },
    {
        value: 110,
        label: "Plastics"
    },
    {
        value: 111,
        label: "Political Organization"
    },
    {
        value: 112,
        label: "Primary/Secondary Education"
    },
    {
        value: 113,
        label: "Printing"
    },
    {
        value: 114,
        label: "Professional Training & Coaching"
    },
    {
        value: 115,
        label: "Program Development"
    },
    {
        value: 116,
        label: "Public Policy"
    },
    {
        value: 117,
        label: "Public Relations and Communications"
    },
    {
        value: 118,
        label: "Public Safety"
    },
    {
        value: 119,
        label: "Publishing"
    },
    {
        value: 120,
        label: "Railroad Manufacture"
    },
    {
        value: 121,
        label: "Ranching"
    },
    {
        value: 122,
        label: "Real Estate"
    },
    {
        value: 123,
        label: "Recreational Facilities and Services"
    },
    {
        value: 124,
        label: "Religious Institutions"
    },
    {
        value: 125,
        label: "Renewables & Environment"
    },
    {
        value: 126,
        label: "Research"
    },
    {
        value: 127,
        label: "Restaurants"
    },
    {
        value: 128,
        label: "Retail"
    },
    {
        value: 129,
        label: "Security and Investigations"
    },
    {
        value: 130,
        label: "Semiconductors"
    },
    {
        value: 131,
        label: "Shipbuilding"
    },
    {
        value: 132,
        label: "Sporting Goods"
    },
    {
        value: 133,
        label: "Sports"
    },
    {
        value: 134,
        label: "Staffing and Recruiting"
    },
    {
        value: 135,
        label: "Supermarkets"
    },
    {
        value: 136,
        label: "Telecommunications"
    },
    {
        value: 137,
        label: "Textiles"
    },
    {
        value: 138,
        label: "Think Tanks"
    },
    {
        value: 139,
        label: "Tobacco"
    },
    {
        value: 140,
        label: "Translation and Localization"
    },
    {
        value: 141,
        label: "Transportation/Trucking/Railroad"
    },
    {
        value: 142,
        label: "Utilities"
    },
    {
        value: 143,
        label: "Venture Capital & Private Equity"
    },
    {
        value: 144,
        label: "Veterinary"
    },
    {
        value: 145,
        label: "Warehousing"
    },
    {
        value: 146,
        label: "Wholesale"
    },
    {
        value: 147,
        label: "Wine and Spirits"
    },
    {
        value: 148,
        label: "Wireless"
    },
    {
        value: 149,
        label: "Writing and Editing"
    }
];

export default INDUSTRIES;