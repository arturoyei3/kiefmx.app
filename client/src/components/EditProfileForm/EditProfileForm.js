import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { createStructuredSelector } from 'reselect';

import {
  selectCurrentUser,
  selectToken,
  selectUpdatingProfile,
} from '../../redux/user/userSelectors';
import { updateProfileStart } from '../../redux/user/userActions';
import { showAlert } from '../../redux/alert/alertActions';

import {
  validateEmail,
  validateFullName,
  validateUsername,
  validateBio,
  validateWebsite,
} from '../../utils/validation';


import Avatar from '../Avatar/Avatar';
import FormInput from '../FormInput/FormInput';
import FormTextarea from '../FormTextarea/FormTextarea';
import Button from '../Button/Button';
import SettingsForm from '../SettingsForm/SettingsForm';
import SettingsFormGroup from '../SettingsForm/SettingsFormGroup/SettingsFormGroup';
import ChangeAvatarButton from '../ChangeAvatarButton/ChangeAvatarButton';

import CannabisUseInput from '../KiefInputs/CannabisUseInput';
import CannabisPreferencesInput from '../KiefInputs/CannabisPreferencesInput';
import { VerifiedIcon} from '../../components/Icons/Icons';
import Divider from '@material-ui/core/Divider';


const EditProfileForm = ({
  currentUser,
  showAlert,
  token,
  updateProfileStart,
  updatingProfile,
}) => {
  const validate = (values) => {
    const errors = {};
    const emailError = validateEmail(values.email);
    if (emailError) errors.email = emailError;

    const fullNameError = validateFullName(values.fullName);
    if (fullNameError) errors.fullName = fullNameError;

    const usernameError = validateUsername(values.username);
    if (usernameError) errors.username = usernameError;

    const bioError = validateBio(values.bio);
    if (bioError) errors.bio = bioError;

    const websiteError = validateWebsite(values.website);
    if (websiteError) errors.website = websiteError;

    return errors;
  };

  const { t, i18n } = useTranslation();
  const [value, setValue] = useState([])
	const [error, setError] = useState("")
	
  const formik = useFormik({
    initialValues: {
      email: currentUser.email,
      fullName: currentUser.fullName,
      username: currentUser.username,      
      bio: currentUser.bio || '',
      website: currentUser.website || '',
      city: currentUser.city || '',
      canabbisPreference: currentUser.canabbisPreference || '',
    },
    validate,
    onSubmit: async (values) => {
      await updateProfileStart(token, values);
      showAlert('Profile saved.');
    },
  });

  useEffect(() => {
    document.title = 'Edit Profile • kiefmx';
  }, []);

  return (
    <SettingsForm onSubmit={formik.handleSubmit}>
      <SettingsFormGroup>
        <ChangeAvatarButton>
          <Avatar
            className="avatar--small"
            imageSrc={currentUser.avatar}
            style={{ alignSelf: 'start' }}
          />
        </ChangeAvatarButton>
        <div style={{ lineHeight: '2.2rem' }}>
          <h3 className="heading-2 font-medium">{formik.values.username}{currentUser.verified ? (<VerifiedIcon/>) : (null)}</h3>
          <ChangeAvatarButton />
        </div>
      </SettingsFormGroup>

      <SettingsFormGroup>
      <label className="heading-3 font-bold">{t('CannabicProfile.Use')}</label>
        <CannabisUseInput />        
        <label></label>
        <Divider />
      </SettingsFormGroup>

      <SettingsFormGroup>
        <label className="heading-3 font-bold">{t('SignUpCard.FullName')}</label>
        <FormInput
          name="fullName"
          fieldProps={formik.getFieldProps('fullName')}
        />
      </SettingsFormGroup>
      <SettingsFormGroup>
        <label className="heading-3 font-bold">{t('SignUpCard.City')}</label>
        <FormInput
          name="city"
          fieldProps={formik.getFieldProps('city')}
        />
      </SettingsFormGroup>
      <SettingsFormGroup>
        <label className="heading-3 font-bold">{t('SignUpCard.Website')}</label>
        <FormInput
          name="website"
          fieldProps={formik.getFieldProps('website')}
        />
      </SettingsFormGroup>
      <SettingsFormGroup>
        <label className="heading-3 font-bold">{t('SignUpCard.Bio')}</label>
        <FormTextarea name="bio" fieldProps={formik.getFieldProps('bio')} />
      </SettingsFormGroup>
           
      <SettingsFormGroup>
      <label className="heading-3 font-bold">{t('CannabicProfile.Title')}</label>
        <CannabisPreferencesInput
          	label={t('CannabicProfile.SubTitle')}
            value={value}
            setValue={setValue}            
            error={error}
            setError={setError}
        />        
        <label></label>
        <Divider />
      </SettingsFormGroup>
          
                  
      <SettingsFormGroup>
        <label></label>
        <Button
          style={{ width: '10rem' }}
          disabled={Object.keys(formik.touched).length === 0}
          loading={updatingProfile}
          onClick={() => {
            if (!formik.isValid) {
              showAlert(Object.values(formik.errors)[0]);
            }
          }}
        >
          {t('Profile.Submit')}
        </Button>
      </SettingsFormGroup>
    </SettingsForm>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateProfileStart: (authToken, updates) =>
    dispatch(updateProfileStart(authToken, updates)),
  showAlert: (text, onClick) => dispatch(showAlert(text, onClick)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  token: selectToken,
  updatingProfile: selectUpdatingProfile,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm);
