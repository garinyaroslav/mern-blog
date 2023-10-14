import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';

import { SideBlock } from './SideBlock';

interface TagsBlockProps {
  items: string[];
  isLoading: boolean;
}

export const TagsBlock: React.FC<TagsBlockProps> = ({ items, isLoading = true }) => {
  const navigate = useNavigate();

  const onClickTag = (name: string) => {
    navigate(`/mern-blog/tags/${name}`);
  };

  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name: string, i) => (
          <span style={{ textDecoration: 'none', color: 'black' }} key={i}>
            <ListItem onClick={() => onClickTag(name)} key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? <Skeleton width={100} /> : <ListItemText primary={name} />}
              </ListItemButton>
            </ListItem>
          </span>
        ))}
      </List>
    </SideBlock>
  );
};
