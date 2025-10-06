// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, MenuItem } from '@menu/vertical-menu'
import ConditionalRender from '@/components/auth/ConditionalRender'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useTranslation } from '@/hooks/useTranslation'
import useRoleBasedAccess from '@/hooks/useRoleBasedAccess'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

// Menu Data Import
import verticalMenuItems from '@/data/navigation/verticalMenuItems'

// Not using RenderExpandIcon since we don't have expandable menu items

const VerticalMenu = ({ scrollMenu }) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()
  const { t } = useTranslation()
  const { filterNavigation, isAuthenticated, isLoading } = useRoleBasedAccess()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const { lang: locale } = params
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  // Get menu items with translations and filter based on role
  const allMenuItems = verticalMenuItems(t)
  const menuItems = isAuthenticated ? filterNavigation(allMenuItems) : allMenuItems.filter(item => !item.module)

  // Show loading state while authentication is being checked
  if (isLoading) {
    return (
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
        <div className='flex items-center justify-center p-4'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
        </div>
      </ScrollWrapper>
    )
  }

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
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} href={`/${locale}${item.path}`} icon={<i className={item.icon} />} exactMatch={false}>
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
