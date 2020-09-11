import React, {useState, useEffect} from 'react';
import propTypes from 'prop-types';

import {Section, Box, Media, Content, Level, Button} from 'react-bulma-components';

import api from '../../utils/api';

function CommentView(props) {

  const [comment, setComment] = useState();

  useEffect(() => {
    getComment(props.commentId);
  },[]);

  function getComment(id) {
    api.getComment(id)
      .then(res => {
        setComment(res.data);
      })
  }

  if(comment) {
    return (
      <Section>
        <Box>
          <Media>
            <Media.Item>
              <Content>
                <p>
                  <strong>commenter name (_id): {comment.user}</strong> <small>Commented: {comment.date}</small>
                  <br />
                  {comment.content}
                </p>
              </Content>
              <Level breakpoint='mobile'>
                <Level.Side align='left'>
                  <Button>Like</Button> +{comment.like.length}
                  <Button>Dislike</Button> -{comment.dislike.length}
                </Level.Side>
              </Level>
            </Media.Item>
          </Media>
        </Box>
      </Section>
    );
  } else {
    return(
      <p>comment view</p>
    );
  }
}

CommentView.propTypes = {
  commentId: propTypes.string,
}

export default CommentView;