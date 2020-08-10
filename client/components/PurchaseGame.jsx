import React from 'react';
import styles from '../style.css';

const PurchaseGame = (props) => (
  <div className={styles.game_purchase_wrapper}>
    <div className={styles.game_purchase_block}>
      <div className="game_purchase_banner">
        <h1>
          Game Title
        </h1>
        <p className={styles.game_purchase_subtitle}>
          Promotion details promotion date
        </p>
      </div>
      <div className={styles.game_purchase}>
        <div className={styles.game_purchase_data}>
          <div className={styles.discount_pct_amount}>-50%</div>
          <div className={styles.prices}>
            <div className={styles.original_price}>$100.00</div>
            <div className={styles.discounted_price}>$50.00</div>
          </div>
          <div className={styles.green_btn}>
            <a className="btn_purchase" href="#"><span>Add To Cart</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PurchaseGame;