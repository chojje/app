import React, { Component } from 'react';
import { IBuildingMeasuresCardProps, IBuildingMeasuresCardState, IBuildingMeasureCategoryCard, IDictEventHandler, IDictBuildingMeasure, IBuildingMeasureInfo, EnvelopeMeasureParameters, WindowMeasureParameters, HvacMeasureParameters, BasementMeasureParameters } from '../../../types';
import { Button, Collapse, FormGroup } from '@blueprintjs/core';

import { renderInputField, } from '../../../helpers';

export class BuildingMeasuresCard extends Component<IBuildingMeasuresCardProps, IBuildingMeasuresCardState> {
  
  constructor(props: IBuildingMeasuresCardProps) {
    super(props);   
    const buildingMeasureCategories: Record<string,IBuildingMeasureCategoryCard> = {
      // todo: it would be neat if a factory could produce these
      roof: {
        name: "roof",
        title: "Roof",
        isOpen: false,
        eventHandlers: {
          handleChange: this.props.handleChange,
          handleAddBuildingMeasureClick: this.props.addBuildingMeasure,
        },
        parameters: new EnvelopeMeasureParameters(),
      },
      facade: {
        name: "facade",
        title: "Façade",
        isOpen: false,
        eventHandlers: {
          handleChange: this.props.handleChange,
          handleAddBuildingMeasureClick: this.props.addBuildingMeasure,
        },
        parameters: new EnvelopeMeasureParameters(),
      },
      foundation: {
        name: "foundation",
        title: "Foundation",
        isOpen: false,
        eventHandlers: {
          handleChange: this.props.handleChange,
          handleAddBuildingMeasureClick: this.props.addBuildingMeasure,
        },
        parameters: new BasementMeasureParameters(),
      },
      windows: {
        name: "windows",
        title: "Windows",
        isOpen: false,
        eventHandlers: {
          handleChange: this.props.handleChange,
          handleAddBuildingMeasureClick: this.props.addBuildingMeasure,
        },
        parameters: new WindowMeasureParameters(),
      },
      hvac: {
        name: "hvac",
        title: "HVAC system",
        isOpen: false,
        eventHandlers: {
          handleChange: this.props.handleChange,
          handleAddBuildingMeasureClick: this.props.addBuildingMeasure,
        },
        parameters: new HvacMeasureParameters(),
      },
    };

    this.state = { buildingMeasureCategories };
  }

  handleExpandBuildingMeasuresCategoryClick = (e: React.MouseEvent<HTMLElement>, name: string) => {
    let newState = { ...this.state };
    newState.buildingMeasureCategories[name].isOpen = !newState.buildingMeasureCategories[name].isOpen;
    this.setState(newState);
  }

  render() {
    const buildingMeasures = this.props.data;
    return (
      <div>
        {
          Object.keys(this.state.buildingMeasureCategories).map(id => {
            const card = this.state.buildingMeasureCategories[id];
            const data = buildingMeasures[id];
            return (
              <div className="building-advanced-options-wrapper" key={`${id}-div`}>
                <Button
                  minimal
                  className="bp3-button"
                  name={card.name}
                  icon={card.isOpen ? "arrow-up" : "arrow-down"}
                  onClick={(e: React.MouseEvent<HTMLElement>) => this.handleExpandBuildingMeasuresCategoryClick(e, id)}>
                  <h4>{card.title}</h4>
                </Button>
                <BuildingMeasureCategoryCard key={id} isOpen={card.isOpen} data={data} eventHandlers={card.eventHandlers} category={id} parameters={card.parameters} />
              </div>
            )
          })
        }
      </div>
    )
  }
}

interface IBuildingMeasureCategoryCardProps {
  isOpen: boolean;
  data: IDictBuildingMeasure;
  eventHandlers: IDictEventHandler;
  category: string;
  parameters: Record<string,IBuildingMeasureInfo>;
}

const BuildingMeasureCategoryCard = (props: IBuildingMeasureCategoryCardProps) => {
  const buildingMeasures = props.data;
  const category = props.category;
  return (
    <div>
      <Collapse key={`${category}-collapse`} isOpen={props.isOpen}>
        {
          Object.keys(props.parameters).map( (paramName: string, i: number) => {
            const param = props.parameters[paramName];
            return (
              <FormGroup
                inline
                className="inline-input"
                key={`building-measure-${paramName}-input`}
                label={param.label}
                labelFor={`building-measure-${paramName}-input`}>
                {
                  Object.keys(buildingMeasures).map(id => {
                    param.path = `buildingMeasures.${category}.${id}.${paramName}`;
                    param.localPath = `${id}.${paramName}`;
                    return renderInputField(`building-measure-${id}`, param, buildingMeasures, props.eventHandlers.handleChange)
                  })
                }
                {
                  !i?  // only have an add button on the first row (i == 0)
                  <Button
                    minimal
                    className="bp3-button add-energy-system-button"
                    icon="add"
                    onClick={(e: React.MouseEvent<HTMLElement>) => props.eventHandlers.handleAddBuildingMeasureClick(category)} />
                  : <span className="empty-button"/>
                }
              </FormGroup>
            )
            
          })
        }
      </Collapse>
    </div>
  )
}
