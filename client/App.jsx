import React from 'react';
import axios from 'axios';

import styles from './style.css';
import { PurchaseOptions, GameInformation } from './components/index.jsx';

const BundleTooltip = ({ game, style }) => (
  <div className={styles.game_tooltip} style={style}>
    <div className={styles.game_tooltip_spacer} />
    <div className={styles.game_tooltip_content}>
      <h4 className={styles.game_tooltip_title}>{game.game_name}</h4>
      <div className={styles.game_tooltip_releasedate}>
        <span>{`${new Date(game.game_release_date).toDateString().substring(4, 7)} ${new Date(game.game_release_date).getDay()}, ${new Date(game.game_release_date).getFullYear()}`}</span>
      </div>
      <p className={styles.game_tooltip_body_content}>{`Contains 1 item: ${game.game_name}`}</p>
      <div className={styles.game_tooltip_platforms}>
        {game.platforms.map((platform) => <span className={styles.platform_icon} style={{ backgroundImage: `url('${platform.platform_icon}')` }} />)}
      </div>
      <div className={styles.game_tooltip_tag_block}>
        User Tags:
        <div className={styles.game_tooltip_tag_row}>
          {game.tags.map((tag) => (
            <div key={tag.tag_id} className={styles.game_tooltip_tag}>{tag.tag_name}</div>))}
        </div>
      </div>
    </div>
  </div>
);

const BundleItem = ({ games }) => (
  <div className={styles.game_tooltip_wrapper}>
    <div className={styles.game_tooltip_container}>
      {Object.keys(games).map((gameKey) => (
        <BundleTooltip key={gameKey} game={games[gameKey]} style={games[gameKey].style} />
      ))}
    </div>
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: {},
      bundles: [],
      hoveredGames: {},
    };
  }

  componentDidMount() {
    this.fetchGameData();
  }

  onBundleItemMouseEnter(game, bundleId, e) {
    const context = e.currentTarget.getBoundingClientRect();
    const key = `${bundleId}_${game.game_id}`;
    this.addBundleItemToHoveredContent(game, key, context);
  }

  onBundleItemMouseExit(game, bundleId, e) {
    const context = e.currentTarget.getBoundingClientRect();
    const key = `${bundleId}_${game.game_id}`;
    const { hoveredGames } = this.state;
    if (!hoveredGames.hasOwnProperty(key)) {
      hoveredGames[key] = game;
    }
    hoveredGames[key].style = {
      left: context.left + context.width,
      top: context.top,
      display: 'none',
    };
    this.setState({
      hoveredGames,
    });
  }

  addBundleItemToHoveredContent(game, key, context) {
    const { hoveredGames } = this.state;
    if (!hoveredGames.hasOwnProperty(key)) {
      hoveredGames[key] = game;
    }
    hoveredGames[key].style = {
      left: context.left + context.width,
      top: context.top,
      display: 'block',
    };
    this.setState({
      hoveredGames,
    });
  }

  fetchGameData() {
    const gameId = 11;
    axios.get(`/api/gameById/${gameId}`)
      .then((res) => {
        this.setState({
          game: res.data,
        });
      })
      .then(() => axios.get(`/api/bundleByGameId/${gameId}`))
      .then((res) => {
        this.setState({
          bundles: res.data,
        });
      });
  }

  render() {
    const { game, bundles, hoveredGames } = this.state;
    return (
      <div>
        <div className={styles.game_info_wrapper}>
          <GameInformation game={game} />
          <PurchaseOptions
            game={game}
            bundles={bundles}
            onBundleItemMouseEnter={this.onBundleItemMouseEnter.bind(this)}
            onBundleItemMouseExit={this.onBundleItemMouseExit.bind(this)}
          />
        </div>
        <BundleItem games={hoveredGames} />
      </div>
    );
  }
}

export default App;
