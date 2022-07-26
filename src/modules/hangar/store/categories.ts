import type { IVehicleCategories } from 'src/modules/hangar/types/hangar';

export const categories: IVehicleCategories = {
  catTitle: 'catType',
  categories: [
    {
      id: 'cGB6DW-xNd8GdX4I9N24S',
      name: 'catEbike',
      image: '/img/categories/ebike/ebike-factory.svg',
      child: {
        catTitle: 'catMade',
        categories: [
          {
            id: 'DwNLVj_Mf-bHgSzsL1KZL',
            name: 'catDiy',
            image: '/img/categories/ebike/ebike-conversion.svg',
            child: {
              catTitle: 'catFrame',
              categories: [
                {
                  id: 'XKBYwLwfXn_Emv8E1hztm',
                  name: 'catHardtail',
                  image: '/img/categories/ebike/ebike-conversion-ht.svg',
                  child: {
                    catTitle: 'catDrive',
                    categories: [
                      {
                        id: 'in1KQgvIjIC1bmV0hBOZd',
                        name: 'catRearHub',
                        image: '/img/categories/ebike/ebike-conversion-ht-hub_r.svg',
                        child: {
                          catTitle: 'catPower',
                          powerRelated: true,
                          categories: [
                            {
                              id: 'OFk8Ql-Cu18GRgsV6cfF1',
                              name: 'catMidPower',
                              image: '/img/categories/ebike/ebike-conversion-ht-hub_r-mp.svg',
                            },
                            {
                              id: 'b0YlW9bMwRUXV6Au3cDH_',
                              name: 'catHighPower',
                              image: '/img/categories/ebike/ebike-conversion-ht-hub_r-hp.svg',
                            },
                            {
                              id: 'Vno_VCgCqeoT6XVNXmBo1',
                              name: 'catCruiser',
                              image: '/img/categories/ebike/ebike-conversion-ht-hub_r-cruiser.svg',
                            },
                          ],
                        },
                      },
                      {
                        id: '1mkxGiFObWo1Jz2yYtT1Q',
                        name: 'catFrontHub',
                        image: '/img/categories/ebike/ebike-conversion-ht-hub_f.svg',
                        child: {
                          catTitle: 'catPower',
                          powerRelated: true,
                          categories: [
                            {
                              id: 'hL96QxppkzaN_4lAU6nPZ',
                              name: 'catLowPower',
                              image: '/img/categories/ebike/ebike-conversion-ht-hub_f-lp.svg',
                            },
                            {
                              id: 'hL96QxppkzaN_4lAU6nPZ',
                              name: 'catMidPower',
                              image: '/img/categories/ebike/ebike-conversion-ht-hub_f-mp.svg',
                            },
                            {
                              id: 'hL96QxppkzaN_4lAU6nPZ',
                              name: 'catCruiser',
                              image: '/img/categories/ebike/ebike-conversion-ht-hub_f-cruiser.svg',
                            },
                          ],
                        },
                      },
                      {
                        id: 'hL96QxppkzaN_4lAU6nPZ',
                        name: 'catMidDrive',
                        image: '/img/categories/ebike/ebike-conversion-ht-mid.svg',
                        child: {
                          catTitle: 'catPower',
                          powerRelated: true,
                          categories: [
                            {
                              id: 'VH20EFscWX5RZZvVANgmo',
                              name: 'catLowPower',
                              image: '/img/categories/ebike/ebike-conversion-ht-mid-lp.svg',
                            },
                            {
                              id: 'yrYPh2P9uiIIcvXKI0U7A',
                              name: 'catMidPower',
                              image: '/img/categories/ebike/ebike-conversion-ht-mid-mp.svg',
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  id: 'vdn0glY4OxzyMAROdDRnK',
                  name: 'catFull',
                  image: '/img/categories/ebike/ebike-conversion-full.svg',
                  child: {
                    catTitle: 'catDrive',
                    categories: [
                      {
                        id: 'DDwqfomYcMsHwEVEgkpE4',
                        name: 'catRearHub',
                        image: '/img/categories/ebike/ebike-conversion-full-hub_r.svg',
                        child: {
                          catTitle: 'catPower',
                          powerRelated: true,
                          categories: [
                            {
                              id: 'Kqvsu-NJb4sWLsq9xl5V_',
                              name: 'catMidPower',
                              image: '/img/categories/ebike/ebike-conversion-full-hub_r-mp.svg',
                            },
                            {
                              id: 'cg-RsVO3_knIoap7k9Ac3',
                              name: 'catHighPower',
                              image: '/img/categories/ebike/ebike-conversion-full-hub_r-hp.svg',
                            },
                            {
                              id: 'LV-grOQ1I-kqPhu-mFf1T',
                              name: 'catInsanePower',
                              image: '/img/categories/ebike/ebike-conversion-full-hub_r-ip.svg',
                            },
                          ],
                        },
                      },
                      {
                        id: 'ZCaoFYRpohPFZDPPaxI9B',
                        name: 'catFrontHub',
                        image: '/img/categories/ebike/ebike-conversion-full-hub_f.svg',
                        child: {
                          catTitle: 'catPower',
                          powerRelated: true,
                          categories: [
                            {
                              id: 'A54ydtMWJh1PYfITzkxO7',
                              name: 'catLowPower',
                              image: '/img/categories/ebike/ebike-conversion-full-hub_f-lp.svg',
                            },
                            {
                              id: 'uRo95TnWiEhVNqgGMshB3',
                              name: 'catMidPower',
                              image: '/img/categories/ebike/ebike-conversion-full-hub_f-mp.svg',
                            },
                          ],
                        },
                      },
                      {
                        id: 'W9mxgnMZbSsp-s8HzAR1U',
                        name: 'catMidDrive',
                        image: '/img/categories/ebike/ebike-conversion-full-mid.svg',
                        child: {
                          catTitle: 'catPower',
                          powerRelated: true,
                          categories: [
                            {
                              id: 'WvLux4IwSCJtsvSW1idgb',
                              name: 'catMidPower',
                              image: '/img/categories/ebike/ebike-conversion-full-mid-mp.svg',
                            },
                            {
                              id: 'kCOfhCzz9EEiQdsN-sA26',
                              name: 'catHighPower',
                              image: '/img/categories/ebike/ebike-conversion-full-mid-hp.svg',
                            },
                            {
                              id: 'JE_RWSU9TC0sDG79X3oCe',
                              name: 'catInsanePower',
                              image: '/img/categories/ebike/ebike-conversion-full-mid-ip.svg',
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            id: 'ZAFEtsbS_twu60cJPh8mY',
            name: 'catFactory',
            image: '/img/categories/ebike/ebike-factory.svg',
            child: {
              catTitle: 'catFrame',
              categories: [
                {
                  id: 'TV7T57ayF7ehqp68Zl394',
                  name: 'catHardtail',
                  image: '/img/categories/ebike/ebike-factory-ht.svg',
                },
                {
                  id: 'GvsG6l4X2Fl_0KCKobP9M',
                  name: 'catFull',
                  image: '/img/categories/ebike/ebike-factory-full.svg',
                },
              ],
            },
          },
          {
            id: 'gpIumLWLhuYRdG9SATW_O',
            name: 'catOther',
            image: '/img/categories/other.svg',
          },
        ],
      },
    },
    {
      id: 'o_4BEAOpUnqWndFlFu8FM',
      name: 'catMonster',
      image: '/img/categories/ebike/ebike-monster.svg',
      child: {
        catTitle: 'catType',
        categories: [
          {
            id: 'maIs1g-It6gQHE03B16oz',
            name: 'catMonsterMountain',
            image: '/img/categories/ebike/ebike-monster-hill_c.svg',
          },
          {
            id: '31gPVruvZ1URza7Rk4EqN',
            name: 'catMonsterSpeed',
            image: '/img/categories/ebike/ebike-monster-speed.svg',
          },
          {
            id: 'a6VkOdtqJGt1Q2wH_jUiw',
            name: 'catMonsterLight',
            image: '/img/categories/ebike/ebike-monster-light.svg',
          },
        ],
      },
    },
    {
      id: 'Tj-t6OmSgcjst7vS0VTlP',
      name: 'catEMoto',
      image: '/img/categories/emoto/emoto.svg',
      child: {
        catTitle: 'catMade',
        categories: [
          {
            id: 'fG9Fg1QGmx2BuuKbQY_bE',
            name: 'catFactory',
            image: '/img/categories/emoto/emoto-factory.svg',
          },
          {
            id: 'A_e5lCIX0OAKJ3KRnp7CA',
            name: 'catDiy',
            image: '/img/categories/emoto/emoto-conversion-mid.svg',
            child: {
              catTitle: 'catDrive',
              categories: [
                {
                  id: 'fiHHGNgmMMA2h7FYOrXgY',
                  name: 'catRearHub',
                  image: '/img/categories/emoto/emoto-conversion-hub.svg',
                },
                {
                  id: 'VWt61uiWvxzxijHCVOyj7',
                  name: 'catMidDrive',
                  image: '/img/categories/emoto/emoto-conversion-mid.svg',
                },
              ],
            },
          },
        ],
      },
    },

    {
      id: 'gJTvJiV6d6CHgnawhIz7v',
      name: 'catECar',
      image: '/img/categories/other.svg',
    },
    {
      id: '5ttnUNAu5tC0w7lBDgPx2',
      name: 'catOther',
      image: '/img/categories/other.svg',
    },
  ],
};
