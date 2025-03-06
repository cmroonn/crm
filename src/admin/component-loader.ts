import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();
import path from 'path';
let dashboardPath = path.resolve('./dist/frontend/components/dashboard.js');
let modelAccountsPath = path.resolve('./dist/frontend/components/model-accounts.js');
let schedulePath = path.resolve('./dist/frontend/components/schedule.js');
let shiftsPath = path.resolve('./dist/frontend/components/shifts.js');
const Components = {
	Dashboard: componentLoader.add('Dashboard', dashboardPath),
	ModelAccounts: componentLoader.add('ModelAccounts', modelAccountsPath),
	ScheduleComponent: componentLoader.add('ScheduleComponent', schedulePath),
	ShiftsComponent: componentLoader.add('ShiftsComponent', shiftsPath)
  }

  

export {componentLoader, Components};
