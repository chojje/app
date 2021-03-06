import React, { Component, ChangeEvent } from 'react';
import { set as _fpSet } from 'lodash/fp';

import { IModelPanelProps, IModelPanelState, IModelOptionsCard, TModelOptionsCategory } from '../../types';

export class ModelPanel extends Component<IModelPanelProps, IModelPanelState> {
  constructor(props: IModelPanelProps) {
    super(props);
    const project = props.project;
    const modelOptions: Record<TModelOptionsCategory,IModelOptionsCard> = {
      energyDemand: {
        eventHandlers: { handleChange: this.handleChange },
        isOpen: false,
        parameters: {
          placeholder: {
            type: String,
            label: "placeholder"
          },
        },
        title: "Energy demand"
      },
      energySystemCost: {
        eventHandlers: { handleChange: this.handleChange },
        isOpen: false,
        parameters: {
          placeholder: {
            type: String,
            label: "placeholder"
          },
        },
        title: "Energy system cost"
      },
      energySystemOutput: {
        eventHandlers: { handleChange: this.handleChange },
        isOpen: false,
        parameters: {
          placeholder: {
            type: String,
            label: "placeholder"
          },
        },
        title: "Energy system output"
      }
      
    }

    this.state = {
      project,
      modelOptions,
    }  
  }

  componentDidUpdate(prevProps: IModelPanelProps) {
    if (this.props.project !== prevProps.project) {
      this.setState({ project: this.props.project });
    }
  }

  handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const path = this.formatPath(e.target.name);
    const newState = _fpSet(path, e.target.value, this.state);
    this.setState(newState);
    this.props.updateProject(newState.project);
  }

  // takes a subpath and returns its location in the main data structure
  formatPath = (childPath: string) => {
    return `project.${childPath}`;
  }
  
  render() {
    //todo: implement this similarly to the ScenariosPanel
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div className="bp3-card panel-card" >Energy demand</div>
        <div className="bp3-card panel-card" >Energy system output</div>
        <div className="bp3-card panel-card" >Energy system cost</div>
      </div>
    )
  }
}