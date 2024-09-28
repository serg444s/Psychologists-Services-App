import { Link } from 'react-router-dom';
import css from './Home.module.css';
import IconSvg from '../../components/IconSvg/IconSvg';

const Home = () => {
  return (
    <div className={css.container}>
      <div className={css.main}>
        <h1 className={css.title}>
          The road to the <span>depths</span> of the human soul
        </h1>
        <p className={css.text}>
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <Link to="/psychologists" className={css.link}>
          Get started
        </Link>
      </div>
      <div className={css.wrapper}>
        <div className={css.orange}>
          <div className={css.iconwrap}>
            <IconSvg iconName={'done'} />
          </div>
          <div>
            <p className={css.description}>Experienced psychologists</p>
            <p className={css.number}>15,000</p>
          </div>
        </div>
        <div className={css.users}>
          <IconSvg
            iconName={'users'}
            styles={css.icon}
            width={25}
            height={25}
          />
        </div>
        <div className={css.znak}>
          <IconSvg iconName={'znak'} styles={css.icon} width={10} height={15} />
        </div>
      </div>
    </div>
  );
};

export default Home;
