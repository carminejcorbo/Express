import { Link } from 'react-router-dom';
import { StyledSection } from '../styles';

const SectionWrapper = ({ children, title, seeAllLink, breadcrumb }) => {
  let breadcrumbContent = null;
  let titleContent = null;
  let seeAllLinkContent = null;

  if (breadcrumb) {
    breadcrumbContent = (
      <span className="section__breadcrumb">  <Link to="/">Profile</Link>  </span>
    );
  }
  if (title) {
    if (seeAllLink) {
      titleContent = ( <Link to={seeAllLink}>{title}</Link> );
    } else {
      titleContent = ( <span>{title}</span>);
    }
  }
  if (seeAllLink) {
    seeAllLinkContent = ( <Link to={seeAllLink} className="section__see-all">See All</Link> );
  }
  return (
    <StyledSection>
      <div className="section__inner">
        <div className="section__top">
          <h2 className="section__heading">
            {breadcrumbContent}
            {titleContent}
          </h2>
          {seeAllLinkContent}
        </div>
        {children}
      </div>
    </StyledSection>
  );
}

export default SectionWrapper;