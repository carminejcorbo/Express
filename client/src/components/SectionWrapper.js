import { Link } from 'react-router-dom';
import { StyledSection } from '../styles';

const SectionWrapper = ({ children, title, seeAllLink, breadcrumb }) => {

  const renderTitle = () => {
    if (title) {
      if (seeAllLink) {
        return (
          <Link to={seeAllLink}>{title}</Link>
        );
      } else {
        return (
          <span>{title}</span>
        );
      }
    }
    return null;
  };

  const renderBreadcrumb = () => {
    if (breadcrumb) {
      return (
        <span className="section__breadcrumb">
          <Link to="/">Profile</Link>
        </span>
      );
    }
    return null;
  };

  const renderSeeAllLink = () => {
    if (seeAllLink) {
      return (
        <Link to={seeAllLink} className="section__see-all">See All</Link>
      );
    }
    return null;
  };

  return (
    <StyledSection>
      <div className="section__inner">
        <div className="section__top">
          <h2 className="section__heading">
            {renderBreadcrumb()}
            {renderTitle()}
          </h2>
          {renderSeeAllLink()}
        </div>
        {children}
      </div>
    </StyledSection>
  );
};

export default SectionWrapper;
