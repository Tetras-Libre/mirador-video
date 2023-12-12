import { Component } from 'react';
import PropTypes from 'prop-types';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { ScrollTo } from './ScrollTo';
import MiradorCanvas from '../lib/MiradorCanvas';
import SidebarIndexItem from '../containers/SidebarIndexItem';
import SidebarIndexThumbnail from '../containers/SidebarIndexThumbnail';

/** */
export class SidebarIndexList extends Component {
  /** @private */
  getIdAndLabelOfCanvases() {
    const { canvases } = this.props;

    return canvases.map((canvas, index) => ({
      id: canvas.id,
      label: new MiradorCanvas(canvas).getLabel(),
    }));
  }

  /** */
  render() {
    const {
      canvases,
      containerRef,
      selectedCanvasIds,
      setCanvas,
      variant,
      windowId,
    } = this.props;

    const canvasesIdAndLabel = this.getIdAndLabelOfCanvases(canvases);
    let Item;

    switch (variant) {
      case 'thumbnail':
        Item = SidebarIndexThumbnail;
        break;
      default:
        Item = SidebarIndexItem;
    }

    return (
      <MenuList variant="selectedMenu">
        {
          canvasesIdAndLabel.map((canvas, canvasIndex) => {
            const onClick = () => { setCanvas(windowId, canvas.id); }; // eslint-disable-line require-jsdoc, max-len

            return (
              <ScrollTo
                containerRef={containerRef}
                key={`${canvas.id}-${variant}`}
                offsetTop={96} // offset for the height of the form above
                selected={selectedCanvasIds.includes(canvas.id)}
                scrollTo={selectedCanvasIds.includes(canvas.id)}
              >
                <MenuItem
                  key={canvas.id}
                  disableGutters
                  sx={{
                    paddingLeft: 2,
                    paddingRight: 1,
                    position: 'initial',
                    whiteSpace: 'normal',
                  }}
                  divider
                  onClick={onClick}
                  component="li"
                >
                  <Item label={canvas.label} canvas={canvases[canvasIndex]} />
                </MenuItem>
              </ScrollTo>
            );
          })
        }
      </MenuList>
    );
  }
}

SidebarIndexList.propTypes = {
  canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  containerRef: PropTypes.oneOf([PropTypes.func, PropTypes.object]).isRequired,
  selectedCanvasIds: PropTypes.arrayOf(PropTypes.string),
  setCanvas: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['item', 'thumbnail']),
  windowId: PropTypes.string.isRequired,
};

SidebarIndexList.defaultProps = {
  selectedCanvasIds: [],
  variant: 'item',
};
