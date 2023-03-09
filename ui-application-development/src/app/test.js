const keysToSum = [
  "billedAR60Days",
  "billedAR60Days90",
  "billedAR90Days180",
  "billedARDays180",
  "retentionAdjustment",
  "billedARDaysActuals",
];
//   {  "projects": [
//         {
//             "projectId": 100001,
//             "projectnumber": 6000001,
//             "projectName": "Project6000001",
//             "projectStatus": "Approved",
//             "lastUpdateDate": "6/25/2022",
//             "lastSummDate": "6/25/2022 9:00:00 AM",
//             "billedAR60Days": [
//                 11, 22, 33, 44, 55, 66, 77, 88, 99, 100, 101, 102, 103
//             ]
//         },
//         {
//             "projectId": 100001,
//             "projectnumber": 6000001,
//             "projectName": "Project6000001",
//             "projectStatus": "Approved",
//             "lastUpdateDate": "6/25/2022",
//             "lastSummDate": "6/25/2022 9:00:00 AM",
//             "billedAR60Days": [
//                 11, 22, 33, 44, 55, 66, 77, 88, 99, 100, 101, 102, 103
//             ]
//         }
//     }

const projects = [
  {
    projectId: 100001,
    projectnumber: 6000001,
    projectName: "Project6000001",
    projectStatus: "Approved",
    lastUpdateDate: "6/25/2022",
    lastSummDate: "6/25/2022 9:00:00 AM",
    billedAR60Days: [11, 22, 33, 44, 55, 66, 77, 88, 99, 100, 101, 102, 103],

    billedAR60Days90: [
      4300196.84, 4100196.84, 470196.84, 440196.84, 4190196.84, 4140196.84,
      4110196.84, 460196.84, 460196.84, 461196.84, 56196.84, 66196.84, 76196.84,
    ],
  },
  {
    projectId: 100001,
    projectnumber: 6000001,
    projectName: "Project6000001",
    projectStatus: "Approved",
    lastUpdateDate: "6/25/2022",
    lastSummDate: "6/25/2022 9:00:00 AM",
    billedAR60Days: [11, 22, 33, 44, 55, 66, 77, 88, 99, 100, 101, 102, 103],

    billedAR60Days90: [
      4300196.84, 4100196.84, 470196.84, 440196.84, 4190196.84, 4140196.84,
      4110196.84, 460196.84, 460196.84, 461196.84, 56196.84, 66196.84, 76196.84,
    ],
  },
  {
    projectId: 100002,
    projectnumber: 6000002,
    projectName: "Project6000002",
    projectStatus: "Approved",
    lastUpdateDate: "6/25/2022",
    lastSummDate: "6/25/2022 9:00:00 AM",
    billedAR60Days: [
      5309023.98, 5319023.98, 5299023.98, 5289023.98, 5339023.98, 5349023.98,
      5309023.98, 5409023.98, 609023.98, 309023.98, 359023.98, 459023.98,
      409023.98,
    ],
    billedAR60Days90: [
      4300196.84, 4100196.84, 470196.84, 440196.84, 4190196.84, 4140196.84,
      4110196.84, 460196.84, 460196.84, 461196.84, 56196.84, 66196.84, 76196.84,
    ],
    billedAR90Days180: [
      4136225.57, 4156225.57, 156225.57, 156225.57, 106225.57, 96225.57,
      66225.57, 66225.57, 76225.57, 126225.57, 126225.57, 126225.57, 96225.57,
    ],
    billedARDays180: [
      4136225.57, 4156225.57, 156225.57, 156225.57, 106225.57, 96225.57,
      66225.57, 66225.57, 76225.57, 126225.57, 126225.57, 126225.57, 96225.57,
    ],
    retentionAdjustment: [4136225, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4136225],
    billedARDaysActuals: [23, 20, 17, 18, 19, 16, 16, 15, 16, 16, 19, 19, 20],
  },
];

const result = {};
keysToSum.forEach((key) => {
  result[key] = projects.reduce((sum, project) => {
    const series = project[key] ?? [];
    return series.map((item, index) => {
      return item + (sum[index] ?? 0);
    });
  }, []);
});

// const anotherResult = Object.keys(result).map((aging) => {
//   const sumBuckets = {};

//   result[aging].forEach((sum, index) => {
//     sumBuckets[`bucket${index + 1}`] = sum;
//   });

//   return {
//     aging: aging,
//     ...sumBuckets,
//   };
// });

// {
//     "aging": billedAR60Days,
//     "bucket1": 22,
//     "bucket2": "44"
// },
{
  // "aging": billedAR60Days90,
  //     "bucket1": 22,
  //     "bucket2": "44"
}