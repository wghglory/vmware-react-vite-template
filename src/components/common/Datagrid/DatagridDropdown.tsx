import {ClarityIcons, ellipsisVerticalIcon, ellipsisVerticalIconName} from '@cds/core/icon';
import {CdsIcon} from '@cds/react/icon';
import React, {useRef, useState} from 'react';
import {useClickAway} from 'react-use';

import AppDropdown from '../AppDropdown';

ClarityIcons.addIcons(ellipsisVerticalIcon);

export default function DatagridDropdown({children}: {children: JSX.Element[]}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const profileRef = useRef(null);
  useClickAway(profileRef, () => {
    setDropdownOpen(false);
  });

  return (
    <div className="relative flex" ref={profileRef}>
      <button
        className="ml-4"
        onClick={() => {
          setDropdownOpen(true);
        }}
      >
        <CdsIcon shape={ellipsisVerticalIconName} />
      </button>
      <div>
        {dropdownOpen && (
          <AppDropdown>
            {/* Important!: enhance children onClick handler setDropdownOpen(false) */}
            {React.Children.map(children, child =>
              React.cloneElement(child, {
                ...child.props,
                onClick: () => {
                  setDropdownOpen(false);
                  child.props.onClick();
                },
              }),
            )}
          </AppDropdown>
        )}
      </div>
    </div>
  );
}
