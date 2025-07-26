// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, SubMenu, MenuItem } from '@menu/vertical-menu'

// import { GenerateVerticalMenu } from '@components/GenerateMenu'
// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const { lang: locale } = params
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}

      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem
          href={`/${locale}/dashboards/analytics`}
          icon={<i className='tabler-smart-home' />}
          exactMatch={false}
          activeUrl='/dashboards/analytics'
        >
          {dictionary['navigation'].dashboards}
        </MenuItem>

        <SubMenu label={dictionary['navigation'].user} icon={<i className='tabler-user' />}>
          <MenuItem href={`/${locale}/apps/user/list`}>{dictionary['navigation'].list}</MenuItem>
          <MenuItem href={`/${locale}/apps/user/view`}>{dictionary['navigation'].view}</MenuItem>
        </SubMenu>
        <SubMenu label={dictionary['navigation'].rolesPermissions} icon={<i className='tabler-lock' />}>
          <MenuItem href={`/${locale}/apps/permissions`}>{dictionary['navigation'].permissions}</MenuItem>
          <MenuItem href={`/${locale}/apps/roles`}>{dictionary['navigation'].roles}</MenuItem>
        </SubMenu>
        <SubMenu label={dictionary['navigation'].client} icon={<i className='tabler-user-star' />}>
          <MenuItem href={`/${locale}/apps/client/list`}>{dictionary['navigation'].list}</MenuItem>
          <MenuItem href={`/${locale}/apps/client/view`}>{dictionary['navigation'].view}</MenuItem>
        </SubMenu>
        <SubMenu label={dictionary['navigation'].invoice} icon={<i className='tabler-file-description' />}>
          <MenuItem href={`/${locale}/apps/invoice/list`}>{dictionary['navigation'].list}</MenuItem>
          <MenuItem href={`/${locale}/apps/invoice/preview/4987`} exactMatch={false} activeUrl='/apps/invoice/preview'>
            {dictionary['navigation'].preview}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/invoice/edit/4987`} exactMatch={false} activeUrl='/apps/invoice/edit'>
            {dictionary['navigation'].edit}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/invoice/add`}>{dictionary['navigation'].add}</MenuItem>
        </SubMenu>

        {/* New Branch Menu */}
        <SubMenu label={dictionary['navigation'].branch} icon={<i className='tabler-building-bank' />}>
          <MenuItem href={`/${locale}/apps/branch/list`}>{dictionary['navigation'].list}</MenuItem>
          <MenuItem href={`/${locale}/apps/branch/view`}>{dictionary['navigation'].view}</MenuItem>
        </SubMenu>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu