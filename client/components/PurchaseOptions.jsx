import React from 'react';
import styles from '../style.css';

import PurchaseGame from './PurchaseGame.jsx';
import PurchaseBundle from './PurchaseBundle.jsx';

const PurchaseOptions = ({
  game,
  bundles,
  onBundleItemMouseEnter,
  onBundleItemMouseExit,
}) => (
  <div className={styles.left_column}>
    <PurchaseGame game={game} />
    {bundles.map((bundle) => (
      <PurchaseBundle
        key={bundle.bundle_id}
        bundle={bundle}
        onMouseEnter={onBundleItemMouseEnter}
        onMouseExit={onBundleItemMouseExit}
      />
    ))}
  </div>
);

export default PurchaseOptions;
