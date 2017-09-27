import React, { Component } from "react";
import ToDo from "./components/ToDo";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      priority: "0",
      newToDo: "",
      toDoList: [],
      edit: false
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  pushToDo() {
    var toDoList = [...this.state.toDoList];
    toDoList.push({
      priority: this.state.priority,
      newToDo: this.state.newToDo
    });
    this.setState({ toDoList });
  }

  handleUpdateToDo (index, newToDo, priority) {
    var toDoList = [...this.state.toDoList];
    toDoList[index] = {
      newToDo,
      priority
    }
    console.log({toDoList})
    this.setState ({
      toDoList
    })
  }

  handlePriority(event) {
    this.setState({
      priority: event.target.value
    });
  }

  handleNewToDoText(event) {
    this.setState({
      newToDo: event.target.value
    });
  }

  handleDelete(index) {
    var toDoList = this.state.toDoList;
    toDoList.splice(index, 1)
    this.setState({ toDoList })
  }

  renderRight() {
    if (this.state.toDoList.length) {
      return(
        <div className="panel panel-default rightPanel">
          <div className="panel-heading">View Todos</div>          
          {this.state.toDoList.map((item, i) => {
            return(
              <ToDo  
                  priority={item.priority}
                  newToDo={item.newToDo}
                  index={i}
                  key={item.priority + item.newToDo + i}
                  handleDelete={this.handleDelete}
                  edit={this.edit}
                  handleUpdateToDo={this.handleUpdateToDo.bind(this)}
            />);
          })}
        </div>
      );
    } else {
      return (
        <div className="panel panel-default rightPanel">
          <div className="panel-heading">View Todos</div>
          <div className="panel-body blueStyle">
            <h4 className="boldText blueText">
              Welcome to the Very Simple Todo App!
            </h4>
            <h4 className="blueText">
              Get started now by adding a new todo on the left.
            </h4>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container">
        {/* Title Area */}
        <div className="page-header">
          <h1 className="title">Very Simple Todo App</h1>
          <h4 className="title">Track all of the things</h4>
        </div>

        {/* Left Panel */}
        <div className="masterDiv">
          <div className="panel panel-default leftPanel">
            <div className="panel-heading">Add New Todo</div>
            <div className="panel-body">
              <h4 className="boldText">I want to..</h4>
              <textarea
                placeholder="Add new todo item here!"
                onChange={event => this.handleNewToDoText(event)}
              />
              <h4 className="boldText">How much of a priority is this?</h4>
              <select
                className="priorityList"
                placeholder="Select a Priority"
                value={this.state.priority}
                onChange={event => this.handlePriority(event)}
              >
                <option disabled hidden value="0">
                  Select a Priority
                </option>
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
              </select>
            </div>
            <div className="panel-footer">
              <button className="btn btn-default green-button" onClick={ () => this.pushToDo()}>Add</button>
            </div>
          </div>

          {/* Right Panel */}
          {this.renderRight()}
        </div>
      </div>
    );
  }
}

export default App;
