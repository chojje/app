import { IProject, OverviewData, CalcData, ScenarioData } from "../../types"
import uuid from "uuid"
import { APP_VERSION } from "../../constants";

export const noop = (s: any) => {

}

export const generateDefaultProject = (): IProject => {
    const defProject = {
        appVersion: APP_VERSION,
        id: uuid(),
        name: "Default project",
        owner: "defaultOwner",
        overviewData: new OverviewData(),
        calcData: new CalcData(),
        scenarioData: new ScenarioData(),
        deleted: false,
    };
    return defProject;
}