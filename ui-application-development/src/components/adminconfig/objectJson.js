const objectData = [
   {
     ObjectName: "HR Assignments",
     ObjectDisplayName: "HR Assignments",
     QueryName: "MasterData.HRAssignmentsQuery",
     Columns: [
       {
         ColumnName: "full_name",
         Filter: "Y",
         ColumnDisplayName: "Employee",
         Type: "textColumnSingleFilter",
         queryString: true
       },
       {
         ColumnName: "assigned_org_name",
         Filter: "N",
         ColumnDisplayName: "Assigned org name",
         Type: "textColumnSingleFilter",
         queryString: true
       },
       {
         ColumnName: "assigned_job_name",
         Filter: "Y",
         ColumnDisplayName: "Assigned job name",
         Type: "textColumnSingleFilter",
         queryString: true
       },
       {
         ColumnName: "location_name",
         Filter: "Y",
         ColumnDisplayName: "Location name",
         Type: "textColumnSingleFilter",
         queryString: true
       },
       {
         ColumnName: "assigned_manager",
         Filter: "Y",
         ColumnDisplayName: "Assigned manager",
         Type: "textColumnSingleFilter",
         queryString: true
       },
       {
         ColumnName: "user_name",
         Filter: "N",
         ColumnDisplayName: "User name",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "assignment_id",
         Filter: "N",
         ColumnDisplayName: "Assignment id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "assignment_type",
         Filter: "N",
         ColumnDisplayName: "Assignment type",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "user_id",
         Filter: "N",
         ColumnDisplayName: "User id",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "person_id",
         Filter: "N",
         ColumnDisplayName: "Person id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "eff_start_date",
         Filter: "N",
         ColumnDisplayName: "Eff start date",
         Type: ['dateFormat'],
         
       },
       {
         ColumnName: "eff_end_date",
         Filter: "N",
         ColumnDisplayName: "Eff end date",
         Type: ['dateFormat'],
         
       },
       {
         ColumnName: "fte_capacity",
         Filter: "N",
         ColumnDisplayName: "Fte capacity",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "assigned_org_id",
         Filter: "N",
         ColumnDisplayName: "Assigned organization id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "assigned_manager_id",
         Filter: "N",
         ColumnDisplayName: "Assigned manager id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "assigned_job_id",
         Filter: "N",
         ColumnDisplayName: "Assigned job id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "assigned_location_id",
         Filter: "N",
         ColumnDisplayName: "Assigned location id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "external_id",
         Filter: "N",
         ColumnDisplayName: "External id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "reporting_attr1",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 1",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr2",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 2",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr3",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 3",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr4",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 4",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr5",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 5",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr6",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 6",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr7",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 7",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr8",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 8",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr9",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 9",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr10",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 10",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr11",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 11",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr12",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 12",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr13",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 13",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr14",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 14",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr15",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 15",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr16",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 16",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr17",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 17",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr18",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 18",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr19",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 19",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr20",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 20",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr21",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 21",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr22",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 22",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr23",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 23",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr24",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 24",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr25",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 25",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr26",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 26",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr27",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 27",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr28",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 28",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr29",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 29",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr30",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 30",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr31",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 31",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr32",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 32",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr33",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 33",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr34",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 34",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr35",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 35",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr36",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 36",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr37",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 37",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr38",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 38",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr39",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 39",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr40",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 40",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "addl_attr",
         Filter: "N",
         ColumnDisplayName: "Addl Attribute",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "object_version_number",
         Filter: "N",
         ColumnDisplayName: "Object version number",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "creation_date",
         Filter: "N",
         ColumnDisplayName: "Creation date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "created_by",
         Filter: "N",
         ColumnDisplayName: "Created by",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "last_updated_by",
         Filter: "N",
         ColumnDisplayName: "Last updated by",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "last_update_date",
         Filter: "N",
         ColumnDisplayName: "Last updated date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "last_login_id",
         Filter: "N",
         ColumnDisplayName: "Last login id",
         Type: "textColumnSingleFilter",
       },
     ],
   },
   {
     ObjectName: "Acm Currency Exchange Rates",
     ObjectDisplayName: "Acm Currency Exchange Rates",
     QueryName: "MasterData.AcmCurrencyExchangeRatesQuery",
     Columns: [
       {
         ColumnName: "rate_type",
         Filter: "Y",
         ColumnDisplayName: "Rate type",
         Type: "textColumnSingleFilter",
         queryString: true
       },
       {
         ColumnName: "from_currency",
         Filter: "Y",
         ColumnDisplayName: "From currency",
         Type: "textColumnSingleFilter",
         queryString: true
       },
       {
         ColumnName: "to_currency",
         Filter: "Y",
         ColumnDisplayName: "To currency",
         Type: "textColumnSingleFilter",
         queryString: true
       },
       {
         ColumnName: "rate_date_from",
         Filter: "N",
         ColumnDisplayName: "Rate date from",
         Type: ['dateFormat']
       },
       {
         ColumnName: "rate_date_to",
         Filter: "N",
         ColumnDisplayName: "Rate date to",
         Type: ['dateFormat']
       },
       {
         ColumnName: "rate",
         Filter: "N",
         ColumnDisplayName: "Rate",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "object_version_number",
         Filter: "N",
         ColumnDisplayName: "Object version number",
         Type: ['numberColumn']
       },
       {
         ColumnName: "creation_date",
         Filter: "N",
         ColumnDisplayName: "Creation date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "created_by",
         Filter: "N",
         ColumnDisplayName: "Created by",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "last_updated_by",
         Filter: "N",
         ColumnDisplayName: "Last updated by",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "last_updated_date",
         Filter: "N",
         ColumnDisplayName: "Last updated date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "last_login_id",
         Filter: "N",
         ColumnDisplayName: "Last login id",
         Type: "textColumnSingleFilter",
       },
     ],
   },
   {
     ObjectName: "Supplier Contacts",
     ObjectDisplayName: "Supplier Contacts",
     QueryName: "MasterData.SupplierContactsQuery",
     Columns: [
       {
         ColumnName: "supplier_name",
         Filter: "Y",
         ColumnDisplayName: "Supplier name",
         Type: "textColumnSingleFilter",
         queryString: true,
       },
       {
         ColumnName: "assignment_type",
         Filter: "Y",
         ColumnDisplayName: "Assignment type",
         Type: "textColumnSingleFilter",
         queryString: true,
       },
       {
         ColumnName: "city",
         Filter: "Y",
         ColumnDisplayName: "City",
         Type: "textColumnSingleFilter",
         queryString: true,
       },
       {
         ColumnName: "state_name",
         Filter: "N",
         ColumnDisplayName: "State name",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "zip",
         Filter: "N",
         ColumnDisplayName: "Zip",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "assignment_id",
         Filter: "N",
         ColumnDisplayName: "Assignment id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "user_id",
         Filter: "N",
         ColumnDisplayName: "User id",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "person_id",
         Filter: "N",
         ColumnDisplayName: "Person id",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "eff_start_date",
         Filter: "N",
         ColumnDisplayName: "Eff start date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "eff_end_date",
         Filter: "N",
         ColumnDisplayName: "Eff end date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "fte_capacity",
         Filter: "N",
         ColumnDisplayName: "Fte capacity",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "assigned_org_id",
         Filter: "N",
         ColumnDisplayName: "Assigned organisation id",
         Type: ['numberFormat'],
       },
       {
         ColumnName: "assigned_manager_id",
         Filter: "N",
         ColumnDisplayName: "Assigned manager id",
         Type: ['numberFormat'],
       },
       {
         ColumnName: "assigned_job_id",
         Filter: "N",
         ColumnDisplayName: "Assigned job id",
         Type: ['numberFormat'],
       },
       {
         ColumnName: "assigned_location_id",
         Filter: "N",
         ColumnDisplayName: "Assigned location id",
         Type: ['numberFormat'],
       },
       {
         ColumnName: "external_id",
         Filter: "N",
         ColumnDisplayName: "External id",
         Type: ['numberFormat'],
       },
       {
         ColumnName: "reporting_attr1",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 1",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr2",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 2",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr3",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 3",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr4",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 4",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr5",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 5",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr6",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 6",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr7",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 7",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr8",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 8",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr9",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 9",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr10",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 10",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr11",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 11",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr12",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 12",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr13",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 13",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr14",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 14",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr15",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 15",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr16",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 16",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr17",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 17",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr18",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 18",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr19",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 19",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr20",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 20",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr21",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 21",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr22",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 22",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr23",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 23",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr24",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 24",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr25",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 25",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr26",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 26",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr27",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 27",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr28",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 28",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr29",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 29",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr30",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 30",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr31",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 31",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr32",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 32",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr33",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 33",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr34",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 34",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr35",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 35",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr36",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 36",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr37",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 37",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr38",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 38",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr39",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 39",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr40",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 40",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "addl_attr",
         Filter: "N",
         ColumnDisplayName: "Addl Attribute",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "object_version_number",
         Filter: "N",
         ColumnDisplayName: "Object version number",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "creation_date",
         Filter: "N",
         ColumnDisplayName: "Creation date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "created_by",
         Filter: "N",
         ColumnDisplayName: "Created by",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "last_updated_by",
         Filter: "N",
         ColumnDisplayName: "Last updated by",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "last_update_date",
         Filter: "N",
         ColumnDisplayName: "Last updated date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "last_login_id",
         Filter: "N",
         ColumnDisplayName: "Last login id",
         Type: "textColumnSingleFilter",
       },
       
     ],
   },
   {
     ObjectName: "Supplier Location",
     ObjectDisplayName: "Supplier Location",
     QueryName: "MasterData.CustomerLocationQuery",
     Columns: [
       {
         ColumnName: "supplier",
         Filter: "Y",
         ColumnDisplayName: "Supplier",
         Type: "textColumnSingleFilter",
         queryString: true,
       },
       {
         ColumnName: "location_name",
         Filter: "Y",
         ColumnDisplayName: "Location name",
         Type: "textColumnSingleFilter",
         queryString: true,
       },
       {
         ColumnName: "location_type",
         Filter: "Y",
         ColumnDisplayName: "Location type",
         Type: "textColumnSingleFilter",
         queryString: true,
       },
       {
         ColumnName: "eff_start_date",
         Filter: "N",
         ColumnDisplayName: "Eff start date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "eff_end_date",
         Filter: "N",
         ColumnDisplayName: "Eff end date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "external_id",
         Filter: "N",
         ColumnDisplayName: "External id",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "address1",
         Filter: "N",
         ColumnDisplayName: "Address 1",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "address2",
         Filter: "N",
         ColumnDisplayName: "Address 2",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "address3",
         Filter: "N",
         ColumnDisplayName: "Address 3",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "city",
         Filter: "N",
         ColumnDisplayName: "City",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "state_name",
         Filter: "N",
         ColumnDisplayName: "State name",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "county_province_district",
         Filter: "N",
         ColumnDisplayName: "Country province district",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "location_name",
         Filter: "N",
         ColumnDisplayName: "Location name",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "zip",
         Filter: "N",
         ColumnDisplayName: "Zip",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "gps_coordinates",
         Filter: "N",
         ColumnDisplayName: "Gps coordinates",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "internal_flag",
         Filter: "N",
         ColumnDisplayName: "Internal flag",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr1",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 1",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr2",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 2",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr3",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 3",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr4",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 4",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr5",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 5",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr6",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 6",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr7",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 7",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr8",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 8",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr9",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 9",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr10",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 10",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr11",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 11",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr12",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 12",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr13",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 13",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr14",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 14",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr15",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 15",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr16",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 16",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr17",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 17",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr18",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 18",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr19",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 19",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr20",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 20",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr21",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 21",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr22",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 22",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr23",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 23",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr24",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 24",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr25",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 25",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr26",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 26",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr27",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 27",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr28",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 28",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr29",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 29",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr30",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 30",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr31",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 31",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr32",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 32",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr33",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 33",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr34",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 34",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr35",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 35",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr36",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 36",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr37",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 37",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr38",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 38",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr39",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 39",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr40",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 40",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "addl_attr",
         Filter: "N",
         ColumnDisplayName: "Addl Attribute",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "object_version_number",
         Filter: "N",
         ColumnDisplayName: "Object version number",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "creation_date",
         Filter: "N",
         ColumnDisplayName: "Creation date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "created_by",
         Filter: "N",
         ColumnDisplayName: "Created by",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "last_updated_by",
         Filter: "N",
         ColumnDisplayName: "Last updated by",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "last_update_date",
         Filter: "N",
         ColumnDisplayName: "Last updated date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "last_login_id",
         Filter: "N",
         ColumnDisplayName: "Last login id",
         Type: "textColumnSingleFilter",
       },
     ],
   },
   {
     ObjectName: "Customer Location",
     ObjectDisplayName: "Customer Location",
     QueryName: "MasterData.CustomerLocationQuery",
     Columns: [
       {
         ColumnName: "customer",
         Filter: "Y",
         ColumnDisplayName: "Customer",
         Type: "textColumnSingleFilter",
         queryString: true,
       },
       {
         ColumnName: "location_name",
         Filter: "Y",
         ColumnDisplayName: "Location name",
         Type: "textColumnSingleFilter",
         queryString: true,
       },
       {
         ColumnName: "location_type",
         Filter: "Y",
         ColumnDisplayName: "Location type",
         Type: "textColumnSingleFilter",
         queryString: true,
       },
       {
         ColumnName: "eff_start_date",
         Filter: "N",
         ColumnDisplayName: "Eff start date",
         Type: ['dateFormat']
       }, 
       {
         ColumnName: "eff_end_date",
         Filter: "N",
         ColumnDisplayName: "Eff end date",
         Type: ['dateFormat']
       },   
       {
         ColumnName: "external_id",
         Filter: "N",
         ColumnDisplayName: "External id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "address1",
         Filter: "Y",
         ColumnDisplayName: "Address 1",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "address2",
         Filter: "Y",
         ColumnDisplayName: "Address 2",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "address3",
         Filter: "N",
         ColumnDisplayName: "Address 3",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "city",
         Filter: "N",
         ColumnDisplayName: "City",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "state_name",
         Filter: "N",
         ColumnDisplayName: "State name",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "county_province_district",
         Filter: "N",
         ColumnDisplayName: "Country province district",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "location_name",
         Filter: "N",
         ColumnDisplayName: "Location name",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "zip",
         Filter: "N",
         ColumnDisplayName: "Zip",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "gps_coordinates",
         Filter: "N",
         ColumnDisplayName: "Gps coordinates",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "internal_flag",
         Filter: "N",
         ColumnDisplayName: "Internal flag",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr1",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 1",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr2",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 2",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr3",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 3",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr4",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 4",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr5",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 5",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr6",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 6",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr7",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 7",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr8",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 8",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr9",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 9",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr10",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 10",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr11",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 11",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr12",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 12",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr13",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 13",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr14",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 14",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr15",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 15",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr16",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 16",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr17",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 17",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr18",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 18",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr19",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 19",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr20",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 20",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr21",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 21",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr22",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 22",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr23",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 23",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr24",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 24",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr25",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 25",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr26",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 26",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr27",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 27",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr28",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 28",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr29",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 29",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr30",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 30",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr31",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 31",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr32",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 32",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr33",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 33",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr34",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 34",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr35",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 35",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr36",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 36",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr37",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 37",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr38",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 38",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr39",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 39",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr40",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 40",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "addl_attr",
         Filter: "N",
         ColumnDisplayName: "Addl Attribute",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "object_version_number",
         Filter: "N",
         ColumnDisplayName: "Object version number",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "creation_date",
         Filter: "N",
         ColumnDisplayName: "Creation date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "created_by",
         Filter: "N",
         ColumnDisplayName: "Created by",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "last_updated_by",
         Filter: "N",
         ColumnDisplayName: "Last updated by",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "last_update_date",
         Filter: "N",
         ColumnDisplayName: "Last updated date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "last_login_id",
         Filter: "N",
         ColumnDisplayName: "Last login id",
         Type: "textColumnSingleFilter",
       },
     ],
   },
   {
     ObjectName: "Customer Location",
     ObjectDisplayName: "Customer Location",
     QueryName: "MasterData.CustomerLocationQuery",
     Columns: [
       {
         ColumnName: "customer",
         Filter: "Y",
         ColumnDisplayName: "Customer",
         Type: "textColumnSingleFilter",
         queryString: true,
       },
       {
         ColumnName: "location_name",
         Filter: "Y",
         ColumnDisplayName: "Location name",
         Type: "textColumnSingleFilter",
         queryString: true,
       },
       {
         ColumnName: "location_type",
         Filter: "Y",
         ColumnDisplayName: "Location type",
         Type: "textColumnSingleFilter",
         queryString: true,
       },
       {
         ColumnName: "eff_start_date",
         Filter: "N",
         ColumnDisplayName: "Eff start date",
         Type: ['dateFormat']
       }, 
       {
         ColumnName: "eff_end_date",
         Filter: "N",
         ColumnDisplayName: "Eff end date",
         Type: ['dateFormat']
       },   
       {
         ColumnName: "external_id",
         Filter: "N",
         ColumnDisplayName: "External id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "assigned_org_id",
         Filter: "N",
         ColumnDisplayName: "Assigned organization id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "assigned_manager_id",
         Filter: "N",
         ColumnDisplayName: "Assigned manager id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "assigned_job_id",
         Filter: "N",
         ColumnDisplayName: "Assigned job id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "assigned_location_id",
         Filter: "N",
         ColumnDisplayName: "Assigned location id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "external_id",
         Filter: "N",
         ColumnDisplayName: "External id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "reporting_attr1",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 1",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr2",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 2",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr3",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 3",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr4",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 4",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr5",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 5",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr6",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 6",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr7",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 7",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr8",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 8",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr9",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 9",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr10",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 10",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr11",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 11",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr12",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 12",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr13",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 13",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr14",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 14",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr15",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 15",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr16",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 16",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr17",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 17",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr18",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 18",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr19",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 19",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr20",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 20",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr21",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 21",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr22",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 22",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr23",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 23",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr24",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 24",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr25",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 25",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr26",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 26",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr27",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 27",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr28",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 28",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr29",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 29",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr30",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 30",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr31",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 31",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr32",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 32",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr33",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 33",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr34",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 34",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr35",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 35",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr36",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 36",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr37",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 37",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr38",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 38",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr39",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 39",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr40",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 40",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "addl_attr",
         Filter: "N",
         ColumnDisplayName: "Addl Attribute",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "object_version_number",
         Filter: "N",
         ColumnDisplayName: "Object version number",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "creation_date",
         Filter: "N",
         ColumnDisplayName: "Creation date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "created_by",
         Filter: "N",
         ColumnDisplayName: "Created by",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "last_updated_by",
         Filter: "N",
         ColumnDisplayName: "Last updated by",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "last_update_date",
         Filter: "N",
         ColumnDisplayName: "Last updated date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "last_login_id",
         Filter: "N",
         ColumnDisplayName: "Last login id",
         Type: "textColumnSingleFilter",
       },
     ],
   },
   {
     ObjectName: "Customer Contacts",
     ObjectDisplayName: "Customer Contacts",
     QueryName: "MasterData.CustomerContactsQuery",
     Columns: [
       {
         ColumnName: "customer_name",
         Filter: "Y",
         ColumnDisplayName: "Customer name",
         Type: "textColumnSingleFilter",
         queryString: true,
       },
       {
         ColumnName: "contact_name",
         Filter: "Y",
         ColumnDisplayName: "Contact name",
         Type: "textColumnSingleFilter",
         queryString: true,
       },
       {
         ColumnName: "assignment_type",
         Filter: "Y",
         ColumnDisplayName: "Assignment type",
         Type: "textColumnSingleFilter",
         queryString: true,
       },
       {
         ColumnName: "assignment_id",
         Filter: "N",
         ColumnDisplayName: "Assignment id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "user_id",
         Filter: "N",
         ColumnDisplayName: "User id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "person_id",
         Filter: "N",
         ColumnDisplayName: "Person id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "eff_start_date",
         Filter: "N",
         ColumnDisplayName: "Eff start date",
         Type: ['dateFormat']
       }, 
       {
         ColumnName: "eff_end_date",
         Filter: "N",
         ColumnDisplayName: "Eff end date",
         Type: ['dateFormat']
       },   
       {
         ColumnName: "fte_capacity",
         Filter: "N",
         ColumnDisplayName: "Fte capacity",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "assigned_org_id",
         Filter: "N",
         ColumnDisplayName: "Assigned organization id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "assigned_manager_id",
         Filter: "N",
         ColumnDisplayName: "Assigned manager id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "assigned_job_id",
         Filter: "N",
         ColumnDisplayName: "Assigned job id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "assigned_location_id",
         Filter: "N",
         ColumnDisplayName: "Assigned location id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "external_id",
         Filter: "N",
         ColumnDisplayName: "External id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "reporting_attr1",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 1",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr2",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 2",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr3",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 3",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr4",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 4",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr5",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 5",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr6",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 6",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr7",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 7",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr8",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 8",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr9",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 9",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr10",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 10",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr11",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 11",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr12",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 12",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr13",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 13",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr14",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 14",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr15",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 15",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr16",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 16",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr17",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 17",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr18",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 18",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr19",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 19",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr20",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 20",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr21",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 21",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr22",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 22",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr23",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 23",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr24",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 24",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr25",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 25",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr26",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 26",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr27",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 27",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr28",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 28",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr29",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 29",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr30",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 30",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr31",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 31",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr32",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 32",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr33",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 33",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr34",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 34",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr35",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 35",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr36",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 36",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr37",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 37",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr38",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 38",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr39",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 39",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "reporting_attr40",
         Filter: "N",
         ColumnDisplayName: "Reporting Attribute 40",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "addl_attr",
         Filter: "N",
         ColumnDisplayName: "Addl Attribute",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "object_version_number",
         Filter: "N",
         ColumnDisplayName: "Object version number",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "creation_date",
         Filter: "N",
         ColumnDisplayName: "Creation date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "created_by",
         Filter: "N",
         ColumnDisplayName: "Created by",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "last_updated_by",
         Filter: "N",
         ColumnDisplayName: "Last updated by",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "last_update_date",
         Filter: "N",
         ColumnDisplayName: "Last updated date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "last_login_id",
         Filter: "N",
         ColumnDisplayName: "Last login id",
         Type: "textColumnSingleFilter",
       },
     ],
   },
   {
     ObjectName: "User Role Assignments",
     ObjectDisplayName: "User Role Assignments",
     QueryName: "MasterData.UserRoleAssignmentsQuery",
     Columns: [
       {
         ColumnName: "org_name",
         Filter: "Y",
         ColumnDisplayName: "Org name",
         Type: "textColumnSingleFilter",
         queryString: true
       },
       {
         ColumnName: "user_name",
         Filter: "Y",
         ColumnDisplayName: "User name",
         Type: "textColumnSingleFilter",
         queryString: true
       },
       {
         ColumnName: "role_name",
         Filter: "Y",
         ColumnDisplayName: "Role name",
         Type: "textColumnSingleFilter",
         queryString: true
       },
       {
         ColumnName: "role_assignment_id",
         Filter: "N",
         ColumnDisplayName: "Role assignment id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "user_id",
         Filter: "N",
         ColumnDisplayName: "User id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "role_id",
         Filter: "N",
         ColumnDisplayName: "Role id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "org_id",
         Filter: "N",
         ColumnDisplayName: "Organization id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "eff_start_date",
         Filter: "N",
         ColumnDisplayName: "Assignment id",
         Type: ['dateFormat']
       },
       {
         ColumnName: "eff_end_date",
         Filter: "N",
         ColumnDisplayName: "Assignment id",
         Type: ['dateFormat']
       },
       {
         ColumnName: "object_version_number",
         Filter: "N",
         ColumnDisplayName: "Object version number",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "creation_date",
         Filter: "N",
         ColumnDisplayName: "Creation date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "created_by",
         Filter: "N",
         ColumnDisplayName: "Created by",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "last_updated_by",
         Filter: "N",
         ColumnDisplayName: "Last updated by",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "last_update_date",
         Filter: "N",
         ColumnDisplayName: "Last updated date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "last_login_id",
         Filter: "N",
         ColumnDisplayName: "Last login id",
         Type: "textColumnSingleFilter",
       },
     ],
   },
   {
     ObjectName: "Acm Periods",
     ObjectDisplayName: "Acm Periods",
     QueryName: "MasterData.AcmPeriodsQuery",
     Columns: [
       {
         ColumnName: "period_type_name",
         Filter: "Y",
         ColumnDisplayName: "Period type name",
         Type: "textColumnSingleFilter",
         queryString: true
       },
       {
         ColumnName: "period_name",
         Filter: "Y",
         ColumnDisplayName: "Period name",
         Type: "textColumnSingleFilter",
         queryString: true
       },
       {
         ColumnName: "period_display_name",
         Filter: "Y",
         ColumnDisplayName: "Period display name",
         Type: "textColumnSingleFilter",
         queryString: true
       },
       {
         ColumnName: "period_id",
         Filter: "N",
         ColumnDisplayName: "Period id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "external_id",
         Filter: "N",
         ColumnDisplayName: "External id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "period_status_id",
         Filter: "N",
         ColumnDisplayName: "Period status id",
         Type: ['numberColumn']
       },
       {
         ColumnName: "period_display_name",
         Filter: "N",
         ColumnDisplayName: "Period display name",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "eff_start_date",
         Filter: "N",
         ColumnDisplayName: "Eff start id",
         Type: ['dateFormat']
       },
       {
         ColumnName: "eff_end_date",
         Filter: "N",
         ColumnDisplayName: "Eff end date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "quarter",
         Filter: "N",
         ColumnDisplayName: "Quarter",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "quarter_start_date",
         Filter: "N",
         ColumnDisplayName: "Quarter start date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "quarter_end_date",
         Filter: "N",
         ColumnDisplayName: "Quarter end date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "year",
         Filter: "N",
         ColumnDisplayName: "year",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "year_start_date",
         Filter: "N",
         ColumnDisplayName: "Year start date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "year_end_date",
         Filter: "N",
         ColumnDisplayName: "Year end date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "object_version_number",
         Filter: "N",
         ColumnDisplayName: "Object version number",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "creation_date",
         Filter: "N",
         ColumnDisplayName: "Creation date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "created_by",
         Filter: "N",
         ColumnDisplayName: "Created by",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "last_updated_by",
         Filter: "N",
         ColumnDisplayName: "Last updated by",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "last_update_date",
         Filter: "N",
         ColumnDisplayName: "Last updated date",
         Type: ['dateFormat']
       },
       {
         ColumnName: "last_login_id",
         Filter: "N",
         ColumnDisplayName: "Last login id",
         Type: "textColumnSingleFilter",
       },
       {
         ColumnName: "period",
         Filter: "N",
         ColumnDisplayName: "Period",
         Type: "textColumnSingleFilter",
       },
     ],
   },
 ];
 
 export default objectData;
 