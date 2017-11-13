import { connect } from 'react-redux';
import { List } from '../../components/List';

const mapStateToProps = (state) => ({
  items: state.list.items,
});

const enhancer = connect(mapStateToProps, undefined);
const connectedComponent = enhancer(List);

export { connectedComponent as ListRedux };
