import React from "react";

export default class ToDo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      priority: this.props.priority,
      description: this.props.newToDo
    };
  }

  handleCSSPriority(priority) {
    switch (priority) {
      case "1":
        return "list-group-item list-group-item-danger";
      case "2":
        return "list-group-item list-group-item-warning";
      case "3":
        return "list-group-item list-group-item-success";
    }
  }

  toggleEdit() {
    this.setState({
      editing: !this.state.editing
    });
  }

  handlePriority(event) {
    this.setState({
      priority: event.target.value
    });
  }

  handleDescription(event) {
    this.setState({
      description: event.target.value
    });
  }

  handleSave() {
    this.props.handleUpdateToDo(this.props.index, this.state.description, this.state.priority);
    this.toggleEdit()
  }


  render() {
    if (!this.state.editing) {
      return (
        <div className={`flx ${this.handleCSSPriority(this.props.priority)}`}>
          <div className="fls">
            <strong>{this.props.newToDo}</strong>
          </div>
          <button
            type="button"
            className="btn btn-default"
            onClick={() => this.toggleEdit()}
          >
            <span
              className="glyphicon glyphicon-pencil flp"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={() => this.props.handleDelete(this.props.index)}
          >
            <span
              className="glyphicon glyphicon-remove flp"
              aria-hidden="true"
            />
          </button>
        </div>
      );
    }
    return (
      <div className={this.handleCSSPriority(this.props.priority)}>
        <div>
          <h4 className="boldText">Description</h4>
        </div>
        <div>
          <textarea className="maxWidth" value={this.state.description} onChange={event => this.handleDescription(event)}/>
        </div>
        <h4 className="boldText">Priority</h4>
        <select
          className="priorityList2"
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
        <button className="btn btn-default green-button smlButton" onClick={() => this.handleSave()}>Save</button>
      </div>
    );
  }
}
