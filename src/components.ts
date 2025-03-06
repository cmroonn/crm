import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
	Dashboard: componentLoader.override('Dashboard', './dashboard'),
	
}

export default Components;