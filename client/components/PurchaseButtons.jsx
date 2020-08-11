import React from 'react';
import styles from '../style.css'

const SalePurchaseButton = ({ price, sale_amount }) => (
  <div className={styles.game_purchase_data}>
    <div className={styles.discount_pct_amount}>{`${sale_amount}%`}</div>
    <div className={styles.prices}>
      <div className={styles.original_price}>{`\$${(price/100).toFixed(2)}`}</div>
      <div className={styles.discounted_price}>{`\$${(price/100 * (1 + sale_amount/100)).toFixed(2)}`}</div>
    </div>
    <div className={styles.green_btn}>
      <a className="btn_purchase" href="#"><span>Add To Cart</span></a>
    </div>
  </div>
);

const PurchaseButton = ({ price }) => (
  <div className={styles.game_purchase_data}>
    <div className={styles.prices}>
      <div className={styles.nosale_original_price}>{`\$${(price/100).toFixed(2)}`}</div>
    </div>
    <div className={styles.green_btn}>
      <a className="btn_purchase" href="#"><span>Add To Cart</span></a>
    </div>
  </div>
);


export {
  PurchaseButton,
  SalePurchaseButton,
};