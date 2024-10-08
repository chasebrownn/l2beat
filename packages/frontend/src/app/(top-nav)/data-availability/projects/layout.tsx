import { ContentWrapper } from '~/components/content-wrapper'
import { ScrollToTopButton } from '~/components/scroll-to-top-button'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ContentWrapper mobileFull>
      {children}
      <ScrollToTopButton />
    </ContentWrapper>
  )
}
