import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { showAlert } from '../../../redux/alert/alertActions';
import { showModal, hideModal } from '../../../redux/modal/modalActions';

import { votePost } from '../../../services/postService';

import Icon from '../../Icon/Icon';
import PulsatingIcon from '../../Icon/PulsatingIcon/PulsatingIcon';
import LoginCard from '../../LoginCard/LoginCard';

const PostDialogLike = ({
  currentUser,
  post,
  token,
  dispatch,
  profileDispatch,
  showAlert,
  showModal,
  hideModal,  
}) => {
  const ref = useRef();

  const { t, i18n } = useTranslation();

  const handleClick = async () => {
    if (!currentUser) {
      return showModal(
        {
          children: <LoginCard onClick={() => hideModal('Card/Card')} modal />,
          style: {
            gridColumn: 'center-start / center-end',
            justifySelf: 'center',
            width: '40rem',
          },
        },
        'Card/Card'
      );
    }
    // Dispatch the action immediately to avoid a delay between the user's click and something happening
    dispatch({
      type: 'VOTE_POST',
      payload: { currentUser, postId: post._id, dispatch: profileDispatch },
    });
    try {
      await votePost(post._id, token);
    } catch (err) {
      showAlert(t('PostDialog.Stats.CouldNotVoteOnThePost'), () => handleClick());
    }
  };

  return (
    <div
      ref={ref}      
      data-test="component-post-dialog-stats"
      className="to-right"
    >
      {currentUser ? (
        <PulsatingIcon
          toggle={
            !!post.postVotes.find((vote) => vote.author === currentUser._id)
          }
          elementRef={ref}
          constantProps={{
            onClick: () => handleClick(),
          }}
          toggledProps={[
            {
              className: 'icon--button post-dialog__like color-kiefmx',
              icon: 'heart',
            },
            {
              className: 'icon--button post-dialog__like',
              icon: 'heart-outline',
            },
          ]}
        />
      ) : (
        <Icon
          onClick={() => handleClick()}
          icon="heart-outline"
          className="icon--button post-dialog__like"
        />
      )}
                  
      <p className="heading-5 center">
        {post.postVotes.length === 0 ? (
          <span>
            <b
              style={{ cursor: 'pointer' }}
              onClick={(event) => {
                event.nativeEvent.stopImmediatePropagation();
                handleClick();
              }}
              data-test="component-like-button"
            >
              {post.postVotes.length}{' '}
            </b>
          </span>
        ) : (
          <span>
            <b>
              {post.postVotes.length}{' '}              
            </b>
          </span>
        )}
      </p>      
    </div>
  );
};

PostDialogLike.propTypes = {
  currentUser: PropTypes.object,
  post: PropTypes.object.isRequired,
  token: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  profileDispatch: PropTypes.func,  
};

const mapDispatchToProps = (dispatch) => ({  
  showAlert: (text, onClick) => dispatch(showAlert(text, onClick)),
  showModal: (props, component) => dispatch(showModal(props, component)),
  hideModal: (component) => dispatch(hideModal(component)),
});

export default connect(null, mapDispatchToProps)(PostDialogLike);
