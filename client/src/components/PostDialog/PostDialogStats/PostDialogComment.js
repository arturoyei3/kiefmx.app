import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showAlert } from '../../../redux/alert/alertActions';
import { showModal, hideModal } from '../../../redux/modal/modalActions';

import Icon from '../../Icon/Icon';

const PostDialogComment = ({
  currentUser,
  post,
}) => {
  const ref = useRef();

  const { t, i18n } = useTranslation();
  

  return (
    <div
      ref={ref}      
      data-test="component-post-dialog-stats"
    >
      <Icon
          onClick={() =>
            currentUser && document.querySelector(`#comment_${post._id}` ).focus()
          }
          className="icon--button"
          icon="chatbubble-outline"
        />
                  
      <p className="heading-5 center">
        <span>
          <b>     
            {post.comments.length}{' '}                                    
          </b>
        </span>
      </p>      
    </div>
  );
};

PostDialogComment.propTypes = {
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

export default connect(null, mapDispatchToProps)(PostDialogComment);
