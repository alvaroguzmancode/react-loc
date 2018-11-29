/**
 *
 * Asynchronously loads the component for SideBar
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
