import { JSONWebKeySet } from 'jose';

const jwks: JSONWebKeySet = {
  keys: [
    {
      kty: 'EC',
      kid: 'sig-ec2-0',
      use: 'sig',
      crv: 'P-256',
      x: 'clIyqevUgSKJxGzq0wNuNfMk7Fz9KRROw-KrKODpnrU',
      y: 'CBRDbRaCkjibGNbCgJSEc5tMUMEdmZHSKDgbsm0hvRY',
      d: 'H8N5jf-YkEMDakV3fue-KBiH5lPSZP0jDd00HbjyUbo'
    },
    {
      kty: 'EC',
      kid: 'enc-ec2-0',
      use: 'enc',
      crv: 'P-256',
      x: 'k1Lk0cDiDAyRgPk_94M2h9UycisEEgU-g4l6ZBSZpos',
      y: 'tw-JXUe-5UrrsB3AhdL0cc0P8Cv6HtujBEwmnLlGIL4',
      d: 'o138ZPbHNykmENHpkYAOs5ELp5yawJKHGPicP-m-nm0'
    },
    {
      kty: 'EC',
      kid: 'sig-ec3-0',
      use: 'sig',
      crv: 'P-384',
      x: '3-T0_8h0cF48xlr38jt5CTxc8BIFe9e4Wc8ZKlF9bxO0SX3Q9qBXdHPsP7_zyicr',
      y: 'G13LddETVmaW4mDSq38QRtNnQ927rpF-mGFp6VCcjVKkV_UL4cV2UKUEUhY1smr3',
      d: 'CdlAb12xmvapB0gYM1HiV_Ov8RG8WSHUn_01ega-xWJLyTtSCt9Wtm7GcmqMeyKs'
    },
    {
      kty: 'EC',
      kid: 'enc-ec3-0',
      use: 'enc',
      crv: 'P-384',
      x: '9HQhliKR7TZgmgVPQPlEVrKWTVrjeCcfcxzXUrGKz5DfW14jfJKq8j7H2AFJi538',
      y: 'NoZ9AZCXHNs-pokhhU8ggokQpiTQfYGvXhily3cY2FCUkbmh5t0GO7Dg73IQVfH4',
      d: '7hJc0XODDHYSnseBSd6awAUY8TVgeJScYVfRdtSmw9im_GFlt1f_6uRuawu8GOvf'
    },
    {
      kty: 'EC',
      kid: 'sig-ec5-0',
      use: 'sig',
      crv: 'P-521',
      x: 'AdYx0q23-7qqFLUS8jYBfqw4b8QshTFc0AYsJK6WtGhx69BxOuNRqhwTP0oIGcsZmWFhaZnL7pLbaom__GY4ly-I',
      y: 'AQ3PH4T1UoK_VKR5vcXt5uIwIyDgIprjYUNB9oQB5twI0umaekN9k9IQzjI9Bpg4JNCt83IVNptQJ3AUP6OkM1-h',
      d: 'ANFQ46kVSZicNljjHXD0cJzBrBE74HyEVwj97Sb98gHpCJRHooq57eYd0_-zXja-py98XKz6ejQlJkKULYk1jGzO'
    },
    {
      kty: 'EC',
      kid: 'enc-ec5-0',
      use: 'enc',
      crv: 'P-521',
      x: 'AE31nfYsK9dp08Tg1BUs1P8ijH0r7kvqlXeNUcNSN_t9rwIMgyIu1ov3gOTkBpGXL40p1WVnCM_Q_1R6YxRbKdEj',
      y: 'AOeMP6Tk0WvOfvPVLqLL4F7LQTUbBx6M42nJuCu0zsv6j4eDeTuywESXLitLS1SzZi86JeIi_Xailah-CUhdTlsF',
      d: 'Aeva4NLSH3E-9dV2QwIBINIMVSypYNZLKpH9B2rMjRa9E9FC_YCgH_uVD7ZExXOipBGK7Zx-9QQDv-5pGoqSkRkR'
    },
    {
      kty: 'RSA',
      kid: 'enc-rs-0',
      use: 'enc',
      e: 'AQAB',
      n: 'wmUaUVPf9stHuEajGIzk3beI_AVLiY_RI5ZYdvk5L2KPbejgw91q3zD7UCGfS5b4WD2ZUvunqFzozQuuNxhaHAmi90nIM7ysVAJ7RgGYdXelg_djRb8DwZGHcLJpYwYmunpdNTakBQqCfJ6p-iicWaAI5WkgzU70uW8ys7wSKzGF2o3-PDAUwZwPgl_RbXNeTyHH4zVw1axE2Vnvsie-5Ka_O_G0wnHvx5xmGvlmxrTDc8TcTdcWncay-CQOulrFqQtJJe4RBvqmae5ZJkIocF8riC9Xc5X4desZKFugTBBrJJdjJbrMNAYyGMd-pjw5a47HL4KKACEYJOV23evkRQ',
      d: 'XwicOBwgBn_UfRMTUsI2dOnv7v0Ls6F6ZcJvVyJ5wV-WrO3HTBmn0JsakU8OmB6jJEhg93-NtDJPoUZPkiG2k7RmVixc0mYvfRaFe3D2Pp8SbJR5lLRQOsZRh1fBS6bLMij1_jjLMKe1qQTMJj7KSMqC7txZK-WooCrrh5Cu9SvznOEtnr7hrsBMSxzmTFovs4RMIrP72-DEpSPaVlI3-M8UVzIcYvWE7E3CAXJd_bU4VSb7IBKNyPCYhUw2JbqNXC92ZrpRgyScQboiBFwSSC6CUF-x4vHiHoEcFfTviIqC_y7rDUaTJMjvUlqB0jRiO9LxuqT1UMWhmZhcrJ7PlQ',
      p: '33Flw3hDPDW2HmLO3Em29KOlZ_wxpPhb8tAE_a7P4lc51jjyrPGdQyF_FtR9G5XmDb-so0kJXJaxXNAiEWtviDtNx90YiMGhR9_8DG_eo4m19ihAnfM5u2bhpU7T40Vn81pYRdKXV6wsZ1qnrsLZXKkzQUcsh-XsAeRGPLcYPks',
      q: '3rgwxGPk6ocKUC4fegH1EDSNAVBNMsnFxeuCGDJ3IAWhabuNOoNuClojPGif-5M4ycWlj2zOs98Ief5TIIWXNrHqIklpYdeP2gic7P5AoOelO75w9rvRU8m2KlKjcdeB1rVy1WktujHkEQvzZppUX1u-wflA_HSV7Qlu_N_eja8',
      dp: 'aGH5QE-2WTJeWeOe75ogNjkc1G8kYgUEL3KuYjSAOSS2iDUiaViWNv42-Ntbdr-YMWQRqlY8YVykjs9Mmwatm97Yfz3ycDDEv2cLwGOihpOWxeAYD7HIjpuJXkhtBAcwgKb8BeJTgUmVlNLs8t9j273Pi_dL_lCS6G9TwJloYfE',
      dq: 'JVoAm78hEhAJs764eq6_WbNmfnToLX9XUsUXcVVtUwp-sovIuKp4FvZc-HGXewqKuJQUGwSledcKxeLYMBkXbg3SdWOYb9dGAcv1_Wz6i8GtnWJn8Yk4JvQqP9jSHnKFDOwrUQ0tpQ9e71jwviFdywxI5qEVvAEVb8ZoPbKR0XM',
      qi: 'pMxPhJltX3CuP3p8fLO55gN5Z6T8_DAg7wlLOyyUbTDPLbZduu1OmYNOQ3d9d_cRAuLS6bkMc-wiLdBUvmt23hQizqGsd65lA2F_X4xTYT_RcZBOWpDa90ezSgIL71Qf3XXfxW5WU8Tsp6vvdeA0kD2kRLUSEzExZyJksLs-EhU'
    },
    {
      kty: 'RSA',
      kid: 'sig-rs-0',
      use: 'sig',
      e: 'AQAB',
      n: 'sJsnvn9CMt0EpT2ZJBRwOSMu4NgPPGv8Ki6ppQm-ux21fAo-Nq7fN0h9pG7gmk9cHmeyy5a_4znicIz_ZGpYD_0t_0Ut1sGxmSfdIIp2swjRMekp7D8Meg-NZIFmpCbYCPCHqdKiZxygErMimMOp8gVRQS7H24670-B83lv3Tu6KmOcSUZGBPzM_uzwrVYQB6jl14ECUj2NTKxgF6MfDXpMRUaot_GR1pfLa_WDiIM3TTFZ4UJF0GLBeogebXegQBFsHvAsjXaE1IH4VQ9iYbdWYtfmNnZQZhb87ppCnvggxpCSrc8tswZ2TL2St_QuFrgp7-kpjhtLIs_tCsOtbzQ',
      d: 'ngU2Oq2Dfh9k2LWVIUNoZrekamrotxeoOdYm1RUzJBohGSvRHvy5na2vPkI3ldsMgegngyMP7zEL-8kte5vrz-KqFY7AxTfqwS96HHPIYcmx5QbMDCcd8tmXmiZuwNJA2z7dJIbj6X8je5ftjOMGXReE7N3-1eWRCrQDBrMjReuOc1v9Pgho9-9UrgcXgyHvehHdZfwpwargxiNHFtUpDwryU0pLY9MLEzJ5gPsw8MNZsonUvQr2J0hiYOOQzUbxpRf6Nddu_X6pCmONenwkjxb4AOtKWv-QMe0_VL3TCXe_u_gxwuhbXEMqHHPFRFYB_Fa5vtkgzD98i-tfOYcSAQ',
      p: '1exipRCo7Ejf_GwaM0-3e7PNk1ZuytkrJtGo5Z8Ip0BXuP37N-M6ehZQ5QBC4vdqTZYeX_dkv3gdDf_S95wZw9LjL0Zf4sceUCJretUaHXNHRuYg2PzclNBlfKgxD0RNOUwk_WXTdy0-51FghylknJbvl_I2fFj7esshFwh60SU',
      q: '01e-ZktuYj_pLPf6eryx1Igj1kfFAavKo0yiRLSiH2H4APPLU37xMxCEOB8dFI2srett6up2u4hYCkEWmMl0nXItUZbFSQSsxqNaPCTNA2qdYE5mc6PRGr1TGtZugnDh1hneF4yh14YgeiLB_wv4vz1qJNP1B-pLfwi9NDpmA4k',
      dp: 'i7jykSd5faL3kRI2Zq85g3Vj30kD4j_H3HnyG9AswbjX0v8od09V4Wnz-i6agU3iQ7y6KCoYxqo4J-2gqJNvjKSQOE95z1AIr4RbuQW5IeUqd9dVOwSlOhmHP81HBdaxravbORqp7NxDiqhvKLjTeydmZFMSXVNtJb3I5hdmyHU',
      dq: 'VsTwlBkmIcpxlpfdS-UK8eJPLFvdA5mfoboF6UVsRow3gVSWxxoYN0nxrwT_MIAWRHWjdE59HvOUiek9OM-FRFsrRhMrvpXfxdItawIE9gEgyfiGUbYRVPQkGaGuT3m_DuMh7vM7Qzx7OwnoMimdIA879BDdyjkkc-yHmdjcJ1k',
      qi: 'rO_xr6Fu4nRbX0X5T7cHtU1ImzajNlQO_hwNp5thmGXNQiA2-2eGDg6dmu-rfKQkXAfq7Uhk4ycM9lLWCp2vgM-ArJVlWMpThGskPHc7WxWLRIJqziC6xZyNHxvq1znW79H6KTX1oOi2N7TgmqyA0eqfN_cZf9iA1S2vwIKajp4'
    }
  ]
}

export default jwks;
