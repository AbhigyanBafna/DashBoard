import React from 'react';
import VideoStatistics from './VideoStatistics';
// import QuizStatistics from './QuizStatistics';
// import AssignmentStatistics from './AssignmentStatistics';
// import IndividualStudentData from './IndividualStudentData';

const testBoard = () => {
  return (
    <div className="container">
      <h1>Teacher Dashboard</h1>
      {/* Video Statistics */}
      <VideoStatistics />

      {/* <QuizStatistics />

      <AssignmentStatistics />

      <IndividualStudentData /> */}
    </div>
  );
};

export default testBoard;
