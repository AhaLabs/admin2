import { NearLogin, Logo, Methods } from '..'
import css from './sidebar.module.css'
import useWindowDimensions from '../../hooks/useWindowDimensions'

export const Sidebar: React.FC<React.PropsWithChildren<{
  showLogin: 'near' | false,
}>> = ({ showLogin }) => {
  const { isMobile } = useWindowDimensions()
  return (
    <div className="bokeh flex flex-col h-screen w-fit px-10 min-w-[300px]">
      {!isMobile && (
        <div className={css.nav}>
          <div className="flex items-center justify-center py-5">
            <a href="/" style={{ border: 'none', background: 'transparent' }}>
              <Logo padding="var(--spacing-xs) 0 var(--spacing-s)" />
            </a>
          </div>
          {showLogin === 'near' && <NearLogin />}
        </div>
      )}
      <Methods />
      {isMobile && <div className={css.arrow} />}
    </div>
  )
}
