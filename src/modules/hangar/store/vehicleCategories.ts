import {
  EbikeConversion,
  EbikeConversionFull,
  EbikeConversionFullHubF,
  EbikeConversionFullHubFLp,
  EbikeConversionFullHubFMp,
  EbikeConversionFullHubR,
  EbikeConversionFullHubRHp,
  EbikeConversionFullHubRIp,
  EbikeConversionFullHubRMp,
  EbikeConversionFullMid,
  EbikeConversionFullMidHp,
  EbikeConversionFullMidIp,
  EbikeConversionFullMidMp,
  EbikeConversionHt,
  EbikeConversionHtHubF,
  EbikeConversionHtHubFCruiser,
  EbikeConversionHtHubFLp,
  EbikeConversionHtHubFMp,
  EbikeConversionHtHubR,
  EbikeConversionHtHubRCruiser,
  EbikeConversionHtHubRHp,
  EbikeConversionHtHubRMp,
  EbikeConversionHtMid,
  EbikeConversionHtMidLp,
  EbikeConversionHtMidMp,
  EbikeFactory,
  EbikeFactoryFull,
  EbikeFactoryHt,
  EbikeMonster,
  EbikeMonsterHillC,
  EbikeMonsterLight,
  EbikeMonsterSpeed,
  Emoto,
  EmotoConversionHub,
  EmotoConversionMid,
  EmotoFactory,
  Other,
} from 'src/assets/vehicleCategories';
import type { IVehicleCategories } from 'src/modules/hangar/types/hangar';

export const vehicleCategories: IVehicleCategories = {
  catTitle: 'catType',
  categories: [
    {
      id: 'cGB6DW-xNd8GdX4I9N24S',
      name: 'catEbike',
      image: EbikeFactory,
      child: {
        catTitle: 'catMade',
        categories: [
          {
            id: 'DwNLVj_Mf-bHgSzsL1KZL',
            name: 'catDiy',
            image: EbikeConversion,
            child: {
              catTitle: 'catFrame',
              categories: [
                {
                  id: 'XKBYwLwfXn_Emv8E1hztm',
                  name: 'catHardtail',
                  image: EbikeConversionHt,
                  child: {
                    catTitle: 'catDrive',
                    categories: [
                      {
                        id: 'in1KQgvIjIC1bmV0hBOZd',
                        name: 'catRearHub',
                        image: EbikeConversionHtHubR,
                        child: {
                          catTitle: 'catPower',
                          powerRelated: true,
                          categories: [
                            {
                              id: 'OFk8Ql-Cu18GRgsV6cfF1',
                              name: 'catMidPower',
                              image: EbikeConversionHtHubRMp,
                            },
                            {
                              id: 'b0YlW9bMwRUXV6Au3cDH_',
                              name: 'catHighPower',
                              image: EbikeConversionHtHubRHp,
                            },
                            {
                              id: 'Vno_VCgCqeoT6XVNXmBo1',
                              name: 'catCruiser',
                              image: EbikeConversionHtHubRCruiser,
                            },
                          ],
                        },
                      },
                      {
                        id: '1mkxGiFObWo1Jz2yYtT1Q',
                        name: 'catFrontHub',
                        image: EbikeConversionHtHubF,
                        child: {
                          catTitle: 'catPower',
                          powerRelated: true,
                          categories: [
                            {
                              id: 'hL96QxppkzaN_4lAU6nPZ',
                              name: 'catLowPower',
                              image: EbikeConversionHtHubFLp,
                            },
                            {
                              id: 'hL96QxppkzaN_4lAU6nPZ',
                              name: 'catMidPower',
                              image: EbikeConversionHtHubFMp,
                            },
                            {
                              id: 'hL96QxppkzaN_4lAU6nPZ',
                              name: 'catCruiser',
                              image: EbikeConversionHtHubFCruiser,
                            },
                          ],
                        },
                      },
                      {
                        id: 'hL96QxppkzaN_4lAU6nPZ',
                        name: 'catMidDrive',
                        image: EbikeConversionHtMid,
                        child: {
                          catTitle: 'catPower',
                          powerRelated: true,
                          categories: [
                            {
                              id: 'VH20EFscWX5RZZvVANgmo',
                              name: 'catLowPower',
                              image: EbikeConversionHtMidLp,
                            },
                            {
                              id: 'yrYPh2P9uiIIcvXKI0U7A',
                              name: 'catMidPower',
                              image: EbikeConversionHtMidMp,
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
                  image: EbikeConversionFull,
                  child: {
                    catTitle: 'catDrive',
                    categories: [
                      {
                        id: 'DDwqfomYcMsHwEVEgkpE4',
                        name: 'catRearHub',
                        image: EbikeConversionFullHubR,
                        child: {
                          catTitle: 'catPower',
                          powerRelated: true,
                          categories: [
                            {
                              id: 'Kqvsu-NJb4sWLsq9xl5V_',
                              name: 'catMidPower',
                              image: EbikeConversionFullHubRMp,
                            },
                            {
                              id: 'cg-RsVO3_knIoap7k9Ac3',
                              name: 'catHighPower',
                              image: EbikeConversionFullHubRHp,
                            },
                            {
                              id: 'LV-grOQ1I-kqPhu-mFf1T',
                              name: 'catInsanePower',
                              image: EbikeConversionFullHubRIp,
                            },
                          ],
                        },
                      },
                      {
                        id: 'ZCaoFYRpohPFZDPPaxI9B',
                        name: 'catFrontHub',
                        image: EbikeConversionFullHubF,
                        child: {
                          catTitle: 'catPower',
                          powerRelated: true,
                          categories: [
                            {
                              id: 'A54ydtMWJh1PYfITzkxO7',
                              name: 'catLowPower',
                              image: EbikeConversionFullHubFLp,
                            },
                            {
                              id: 'uRo95TnWiEhVNqgGMshB3',
                              name: 'catMidPower',
                              image: EbikeConversionFullHubFMp,
                            },
                          ],
                        },
                      },
                      {
                        id: 'W9mxgnMZbSsp-s8HzAR1U',
                        name: 'catMidDrive',
                        image: EbikeConversionFullMid,
                        child: {
                          catTitle: 'catPower',
                          powerRelated: true,
                          categories: [
                            {
                              id: 'WvLux4IwSCJtsvSW1idgb',
                              name: 'catMidPower',
                              image: EbikeConversionFullMidMp,
                            },
                            {
                              id: 'kCOfhCzz9EEiQdsN-sA26',
                              name: 'catHighPower',
                              image: EbikeConversionFullMidHp,
                            },
                            {
                              id: 'JE_RWSU9TC0sDG79X3oCe',
                              name: 'catInsanePower',
                              image: EbikeConversionFullMidIp,
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
            image: EbikeFactory,
            child: {
              catTitle: 'catFrame',
              categories: [
                {
                  id: 'TV7T57ayF7ehqp68Zl394',
                  name: 'catHardtail',
                  image: EbikeFactoryHt,
                },
                {
                  id: 'GvsG6l4X2Fl_0KCKobP9M',
                  name: 'catFull',
                  image: EbikeFactoryFull,
                },
              ],
            },
          },
          {
            id: 'gpIumLWLhuYRdG9SATW_O',
            name: 'catOther',
            image: Other,
          },
        ],
      },
    },
    {
      id: 'o_4BEAOpUnqWndFlFu8FM',
      name: 'catMonster',
      image: EbikeMonster,
      child: {
        catTitle: 'catType',
        categories: [
          {
            id: 'maIs1g-It6gQHE03B16oz',
            name: 'catMonsterMountain',
            image: EbikeMonsterHillC,
          },
          {
            id: '31gPVruvZ1URza7Rk4EqN',
            name: 'catMonsterSpeed',
            image: EbikeMonsterSpeed,
          },
          {
            id: 'a6VkOdtqJGt1Q2wH_jUiw',
            name: 'catMonsterLight',
            image: EbikeMonsterLight,
          },
        ],
      },
    },
    {
      id: 'Tj-t6OmSgcjst7vS0VTlP',
      name: 'catEMoto',
      image: Emoto,
      child: {
        catTitle: 'catMade',
        categories: [
          {
            id: 'fG9Fg1QGmx2BuuKbQY_bE',
            name: 'catFactory',
            image: EmotoFactory,
          },
          {
            id: 'A_e5lCIX0OAKJ3KRnp7CA',
            name: 'catDiy',
            image: EmotoConversionMid,
            child: {
              catTitle: 'catDrive',
              categories: [
                {
                  id: 'fiHHGNgmMMA2h7FYOrXgY',
                  name: 'catRearHub',
                  image: EmotoConversionHub,
                },
                {
                  id: 'VWt61uiWvxzxijHCVOyj7',
                  name: 'catMidDrive',
                  image: EmotoConversionMid,
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
      image: Other,
    },
    {
      id: '5ttnUNAu5tC0w7lBDgPx2',
      name: 'catOther',
      image: Other,
    },
  ],
};
