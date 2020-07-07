import { connect } from 'react-redux';
import {
  addTask,
  changeCompletionStatus,
  changeInputText,
} from '../../actions';
import TasksList from '../../components/TasksList';

const mapDispatchToProps = (dispatch) => ({
  addTask: (text) => {
    dispatch(addTask(text));
  },
  changeCompletionStatus: (index) => {
    dispatch(changeCompletionStatus(index));
  },
  onChangeText: (text) => {
    dispatch(changeInputText(text));
  },
});

const mapStateToProps = (state) => ({
  listOfTasks: state.listOfTasks,
  text: state.text,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TasksList);
