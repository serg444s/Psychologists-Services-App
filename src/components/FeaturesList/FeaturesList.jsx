import IconSvg from '../IconSvg/IconSvg';
import css from './FeaturesList.module.css';

const FeaturesList = ({ obj }) => {
  return (
    <ul className={css.details}>
      <li>
        <IconSvg width={20} height={20} iconName={'adults'} />
        <p>{`${obj.adults} adults`}</p>
      </li>
      <li>
        <IconSvg width={20} height={20} iconName={'automatic'} />
        <p>{obj.transmission}</p>
      </li>
      <li>
        <IconSvg width={20} height={20} iconName={'acmask'} />
        <p>{`${obj.details.airConditioner} AC`}</p>
      </li>
      <li>
        <IconSvg width={20} height={20} iconName={'petrol'} />
        <p>{obj.engine}</p>
      </li>
      <li>
        <IconSvg width={20} height={20} iconName={'kitchen'} />
        <p>{`${obj.details.kitchen} kitchen`}</p>
      </li>
      <li>
        <IconSvg width={20} height={20} iconName={'bed'} />
        <p>{`${obj.details.beds} beds`}</p>
      </li>
      <li>
        <IconSvg width={20} height={20} iconName={'conditioner'} />
        <p>{`${obj.details.airConditioner} air conditioner`}</p>
      </li>
      <li>
        <IconSvg width={20} height={20} iconName={'CD'} />
        <p>{`${obj.details.CD} CD`}</p>
      </li>
      <li>
        <IconSvg width={20} height={20} iconName={'radio'} />
        <p>{`${obj.details.radio} radio`}</p>
      </li>
      <li>
        <IconSvg width={20} height={20} iconName={'hob'} />
        <p>{`${obj.details.radio} hob`}</p>
      </li>
    </ul>
  );
};
export default FeaturesList;
