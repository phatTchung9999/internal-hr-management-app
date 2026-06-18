import React from 'react';
import { MdConstruction } from 'react-icons/md';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const FEATURES = {
  applications: {
    title: 'Applications',
    description: 'Review and manage candidates throughout the hiring process.',
    items: [
      'View incoming job applications',
      'Track interview and hiring stages',
      'Add notes and assign recruiters',
      'Accept or reject candidates'
    ]
  },
  onboarding: {
    title: 'New Hires',
    description: 'Organize onboarding tasks for employees joining the company.',
    items: [
      'Create onboarding checklists',
      'Collect required employee documents',
      'Assign orientation tasks',
      'Track onboarding progress'
    ]
  },
  attendance: {
    title: 'Attendance',
    description: 'Monitor employee attendance and working schedules.',
    items: [
      'View clock-in and clock-out records',
      'Track late arrivals and absences',
      'Review weekly attendance summaries',
      'Correct attendance records'
    ]
  },
  requests: {
    title: 'Employee Requests',
    description: 'Review requests submitted by employees.',
    items: [
      'Manage leave and time-off requests',
      'Approve or reject requests',
      'View request history',
      'Notify employees of decisions'
    ]
  },
  payroll: {
    title: 'Payroll',
    description: 'Prepare and review employee compensation.',
    items: [
      'Calculate payroll from worked hours',
      'Review employee pay summaries',
      'Track deductions and adjustments',
      'Generate payroll reports'
    ]
  }
};

const FeaturePreview = () => {
  const navigate = useNavigate();
  const { featureKey } = useParams();
  const feature = FEATURES[featureKey];

  if (!feature) return <Navigate to='/home' replace />;

  return (
    <main className='featurePreviewPage'>
      <section className='featurePreviewCard'>
        <div className='featurePreviewIcon'>
          <MdConstruction />
        </div>
        <span className='comingSoonLabel'>Coming Soon</span>
        <h1>{feature.title}</h1>
        <p>{feature.description}</p>

        <div className='plannedFeatures'>
          <h2>What will be included</h2>
          <ul>
            {feature.items.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <button type='button' onClick={() => navigate('/home')}>
          Back to Home
        </button>
      </section>
    </main>
  );
};

export default FeaturePreview;
