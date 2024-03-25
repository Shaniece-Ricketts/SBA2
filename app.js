/*const result={};
  return result;
}
const learner125 = LearnerSubmissions[0].learner_id;
  const avg = (LearnerSubmissions[0].submission.score + LearnerSubmissions[1].submission.score) / (AssignmentGroup.assignments[0].points_possible + AssignmentGroup.assignments[1].points_possible); 
  const one = (LearnerSubmissions[0].submission.score) / (AssignmentGroup.assignments[0].points_possible);
  const two = (LearnerSubmissions[1].submission.score) / (AssignmentGroup.assignments[1].points_possible);
  
  console.log("id:" + learner125, "avg:" + avg, "1:" + one, "2:" + two)

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// console.log(result);

const learner132 = LearnerSubmissions[3].learner_id;
  const avg2 = (LearnerSubmissions[3].submission.score + LearnerSubmissions[4].submission.score) / (AssignmentGroup.assignments[0].points_possible + AssignmentGroup.assignments[1].points_possible); 
  const one2 = (LearnerSubmissions[3].submission.score) / (AssignmentGroup.assignments[0].points_possible);
  let latePenalty;
  let percentage;
  let submissionDate= new Date(LearnerSubmissions[4].submission.submitted_at);
  let dueDate=new Date (AssignmentGroup.assignments[1].due_at);
  let todayDate= new Date();
  if(submissionDate >dueDate){
    percentage= AssignmentGroup.assignments[1].points_possible *0.10;
    latePenalty=LearnerSubmissions[4].submission.score -percentage;
  }
  // let two2 = (LearnerSubmissions[4].submission.score) / (AssignmentGroup.assignments[1].points_possible);
  let two2 = (latePenalty) / (AssignmentGroup.assignments[1].points_possible);
  console.log("id:" + learner132, "avg:" + avg2, "1:" + one2, "2:" + two2)*/







function getLearnerData(course, ag, submissions) {
  // Declare variables properly using let and const where appropriate
  const learners = {};
  let learnerArray = [];

  // Use at least two different types of loops
  for (const assignment of ag.assignments) {
    // Use try/catch statements to manage potential errors in the code
    try {
      // Use operators to perform calculations on variables and literals
      if (assignment.points_possible === 0) {
        continue; // Utilize at least one loop control keyword such as break or continue
      }

      const assignmentDueDate = new Date(assignment.due_at);
      const assignmentId = assignment.id;

      for (const submission of submissions) {
        if (submission.assignment_id === assignmentId) {
          const learnerId = submission.learner_id;
          if (!learners[learnerId]) {
            learners[learnerId] = {
              id: learnerId,
              totalScore: 0,
              totalPointsPossible: 0,
              scores: {}
            };
          }

          const learner = learners[learnerId];
          const submissionScore = submission.submission.score;
          const pointsPossible = assignment.points_possible;

          if (Number.isNaN(submissionScore)) {
            throw new Error(`Invalid input: Score for assignment ${assignmentId} is not a number.`);
          } else {
            // Ensure scorePercentage stays within range [0, 1]
            let scorePercentage = submissionScore / pointsPossible;
            scorePercentage = Math.max(0, Math.min(1, scorePercentage));
            learner.totalScore += submissionScore;
            learner.totalPointsPossible += pointsPossible;
            learner.scores[assignmentId] = scorePercentage;
          }

          // Check if submission is late
          const submissionDate = new Date(submission.submission.submitted_at);
          if (submissionDate > assignmentDueDate) {
            // Deduct 10% if late
            learner.scores[assignmentId] -= 0.1;
          }
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  // Use at least two if/else statements to control program flow
  for (const learnerId in learners) {
    const learner = learners[learnerId];
    const avg = learner.totalPointsPossible === 0 ? 0 : (learner.totalScore / learner.totalPointsPossible).toFixed(3);

    // Create and/or manipulate arrays and objects
    const formattedLearner = {
      id: learner.id,
      avg: avg,
      ...learner.scores
    };
    learnerArray.push(formattedLearner);
  }

  return learnerArray;
}

// Test data
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 0 // Testing  where points_possible is 0
    }
  ]
};

const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3, // Submission for assignment with points_possible = 0
    submission: {
      submitted_at: "2023-01-25",
      score: "ABC" // Non-numeric score
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  },
  {
    learner_id: 132,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-11-16", // Submission is late
      score: 100
    }
  }
];
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);