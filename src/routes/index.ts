import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/profile', (req, res) => {
  res.json([
    {
      user: {
        id: '588838798474084374',
        username: 'bwuj',
        global_name: 'Lyn',
        avatar: '6ee637afaf87f61c8c017da150df3103',
        avatar_decoration_data: {
          asset: 'a_3c97a2d37f433a7913a1c7b7a735d000',
          sku_id: '1144308439720394944',
          expires_at: null,
        },
        discriminator: '0',
        public_flags: 512,
        primary_guild: {
          identity_guild_id: null,
          identity_enabled: false,
          tag: null,
          badge: null,
        },
        clan: {
          identity_guild_id: null,
          identity_enabled: false,
          tag: null,
          badge: null,
        },
        flags: 512,
        banner: null,
        banner_color: null,
        accent_color: null,
        bio: 'https://rares.wtf',
      },
      connected_accounts: [
        {
          type: 'github',
          id: '145746324',
          name: 'crynew',
          verified: true,
        },
        {
          type: 'twitter',
          id: '1726784113078652928',
          name: 'cryn3w',
          verified: true,
        },
      ],
      premium_since: '2023-05-21T14:15:11.569187+00:00',
      premium_type: 2,
      premium_guild_since: '2024-11-07T23:51:38.053000+00:00',
      profile_themes_experiment_bucket: 4,
      user_profile: {
        bio: 'https://crynew.wtf',
        accent_color: null,
        pronouns: '',
        profile_effect: null,
        banner: null,
        theme_colors: [0, 0],
        popout_animation_particle_type: null,
        emoji: null,
      },
      badges: [
        {
          id: 'early_supporter',
          description: 'Early Supporter',
          icon: '7060786766c9c840eb3019e725d2b358',
          link: 'https://discord.com/settings/premium',
        },
        {
          id: 'premium',
          description: 'Subscriber since May 21, 2023',
          icon: '2ba85e8026a8614b640c2837bcdfe21b',
          link: 'https://discord.com/settings/premium',
        },
        {
          id: 'guild_booster_lvl1',
          description: 'Server boosting since Nov 7, 2024',
          icon: '51040c70d4f20a921ad6674ff86fc95c',
          link: 'https://discord.com/settings/premium',
        },
      ],
      guild_badges: [],
    },
  ]);
});

export default router;
