import React from 'react';

const EmailBody = ({ conferenceURL, contactEmail }) => {
  return (
    <div style={styles.container}>
      <div style={styles.logo}>
        <img src="https://drive.google.com/uc?export=view&id=1jBGW4IqOp00Hqjs4SZJTf5Aap3d58xeL" alt="ConferoLive Logo" style={styles.logoImage} />
      </div>
      <div style={styles.message}>
        <p>You are invited to a video conferencing call hosted by ConferoLive. Please click the button below to join the call:</p>
      </div>
      <a href={conferenceURL} style={styles.invitationLink}>Join Video Call</a>
      <div style={styles.footer}>
        <p>If you have any questions or need assistance, please contact us at {contactEmail}.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '40px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  logoImage: {
    maxWidth: '150px',
  },
  message: {
    marginBottom: '20px',
  },
  invitationLink: {
    display: 'inline-block',
    backgroundColor: '#FF8C00',
    color: '#fff',
    textDecoration: 'none',
    padding: '12px 24px',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  },
  footer: {
    textAlign: 'center',
    color: '#888',
    fontSize: '12px',
  },
};

export default EmailBody;
