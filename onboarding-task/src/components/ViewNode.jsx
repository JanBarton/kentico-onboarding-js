import React from 'react';
import PropTypes from 'prop-types';

const ViewNode = ({ text, index, onEdit }) => <div onClick={onEdit}>{index}. {text}</div>;

ViewNode.displayName = 'ViewNode';

ViewNode.propTypes = {
  text: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export { ViewNode };
