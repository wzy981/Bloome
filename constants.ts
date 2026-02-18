
import { FoodItem, TrafficLight, FoodCategory, Recipe, Post } from './types';

// 食谱保持不变
export const RECIPES: Recipe[] = [
  {
    id: 'rec-1',
    title: '黄金姜黄骨头汤',
    phase: 'REPAIR',
    tags: ['修复肠粘膜', '抗炎'],
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=700&fit=crop',
    calories: 120,
    time: '4h',
    ingredients: ['牛骨 500g', '姜黄粉 10g', '生姜 20g', '苹果醋 1勺'],
    instructions: ['骨头焯水', '加入姜黄、生姜和苹果醋', '小火慢炖4小时提取氨基酸', '过滤取汤']
  },
  {
    id: 'rec-2',
    title: '低敏烤三文鱼配绿芦笋',
    phase: 'REMOVE',
    tags: ['Omega-3', '排除期安全'],
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&h=700&fit=crop',
    calories: 350,
    time: '20min',
    ingredients: ['三文鱼 150g', '绿芦笋 100g', '柠檬 半个', '橄榄油'],
    instructions: ['三文鱼刷油洒盐', '芦笋铺底', '200度烤箱15分钟', '挤上柠檬汁']
  },
  {
    id: 'rec-3',
    title: '南瓜奇亚籽布丁',
    phase: 'REINOCULATE',
    tags: ['益生元', '高纤维'],
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500&h=700&fit=crop',
    calories: 210,
    time: '10min',
    ingredients: ['日本南瓜泥 100g', '奇亚籽 2勺', '椰奶 150ml'],
    instructions: ['混合所有原料', '搅拌均匀', '冷藏2小时至粘稠', '点缀蓝莓食用']
  }
];

// 社区帖子保持不变
export const POSTS: Post[] = [
  {
    id: 'p1',
    author: '小鹿健康日记',
    authorAvatar: 'https://i.pravatar.cc/150?u=p1',
    title: '肠漏症修复21天打卡！',
    content: '坚持喝了三周黄金骨头汤，晨僵真的减轻了好多！',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=600&fit=crop',
    likes: 1258,
    tags: ['#肠漏症', '#自愈']
  }
];

export const IMMUNE_ASSESSMENT_QUESTIONS = {
  dysbiosis: [
    { id: 'dy1', text: '你是否经常感到腹胀或肠道胀气？' },
    { id: 'dy2', text: '你是否曾在一年内服用过两次以上的抗生素？' },
    { id: 'dy3', text: '你是否有念珠菌感染史或频繁的皮肤霉菌感染？' },
    { id: 'dy4', text: '你是否非常渴望甜食或含精制糖的食物？' },
    { id: 'dy5', text: '你是否有脑雾感，或进食后感到困倦？' }
  ],
  digestion: [
    { id: 'di1', text: '进食后你是否感到上腹部沉重或胀满感？' },
    { id: 'di2', text: '你是否经常有胃灼热（烧心）或泛酸？' },
    { id: 'di3', text: '你是否在大便中看到未消化的食物残渣？' },
    { id: 'di4', text: '吃红肉或高蛋白餐食后是否感到不适？' },
    { id: 'di5', text: '你是否经常感到恶心或饭后打嗝？' }
  ],
  leakyGut: [
    { id: 'lg1', text: '你是否有多种食物过敏或对多种食物不耐受？' },
    { id: 'lg2', text: '你是否有慢性关节疼痛或肌肉酸痛？' },
    { id: 'lg3', text: '你是否有湿疹、荨麻疹或原因不明的皮疹？' },
    { id: 'lg4', text: '你是否患有任何已确诊的自身免疫性疾病？' },
    { id: 'lg5', text: '你是否经常感到极度疲劳且无法通过睡眠缓解？' }
  ]
};

export const BRISTOL_SCALE = [
  { type: 1, desc: '硬球状', detail: '很难排出 (便秘严重)' },
  { type: 2, desc: '香肠状但表面凹凸', detail: '颗粒感明显 (轻微便秘)' },
  { type: 3, desc: '香肠状表面有裂纹', detail: '正常范围 (略干燥)' },
  { type: 4, desc: '香肠状或蛇状', detail: '光滑柔软 (最理想形态)' },
  { type: 5, desc: '柔软块状', detail: '边缘清晰 (膳食纤维不足)' },
  { type: 6, desc: '糊状或松散块状', detail: '边缘模糊 (轻微腹泻)' },
  { type: 7, desc: '水状无固体', detail: '完全液体 (严重腹泻)' },
];
export const STOOL_COLORS = ['褐色', '黄色', '绿色', '深色', '红色(预警)'];
export const STOOL_FEELINGS = ['顺畅', '排不尽', '紧急/憋不住', '有疼痛感'];

export const BASE_FOOD_DB: FoodItem[] = [
  // --- 蔬菜类 ---
  { 
    id: 'veg-1', nameZh: '西蓝花', nameEn: 'Broccoli', category: FoodCategory.VEGETABLES, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=200&h=200&fit=crop',
    reason: '注意：西蓝花花朵安全剂量较高，但茎部富含果聚糖。',
    portions: [
      { label: '安全剂量 (花朵)', weight: '75g', light: TrafficLight.GREEN },
      { label: '中剂量 (花朵)', weight: '240g', light: TrafficLight.YELLOW },
      { label: '高剂量 (茎部)', weight: '>350g', light: TrafficLight.RED }
    ]
  },
  { 
    id: 'veg-2', nameZh: '大蒜', nameEn: 'Garlic', category: FoodCategory.VEGETABLES, 
    baseLight: TrafficLight.RED, personalizedLight: TrafficLight.RED,
    imageUrl: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=200&h=200&fit=crop',
    reason: '极高果聚糖含量。即使微量也可能触发 IBS 症状。建议改用大蒜油。',
    portions: [{ label: '1 瓣', weight: '3g', light: TrafficLight.RED }]
  },
  { 
    id: 'veg-3', nameZh: '洋葱', nameEn: 'Onion', category: FoodCategory.VEGETABLES, 
    baseLight: TrafficLight.RED, personalizedLight: TrafficLight.RED,
    imageUrl: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=200&h=200&fit=crop',
    reason: '极高果聚糖和低聚半乳糖 (GOS)。',
    portions: [{ label: '少量', weight: '11g', light: TrafficLight.RED }]
  },
  { 
    id: 'veg-4', nameZh: '胡萝卜', nameEn: 'Carrot', category: FoodCategory.VEGETABLES, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&h=200&fit=crop',
    reason: '无检测出的 FODMAP，非常安全。',
    portions: [{ label: '不限量', weight: '不限量', light: TrafficLight.GREEN }]
  },
  { 
    id: 'veg-5', nameZh: '茄子', nameEn: 'Eggplant', category: FoodCategory.VEGETABLES, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1628553271447-ed31f409ab6c?w=200&h=200&fit=crop',
    reason: '含有少量山梨糖醇。',
    portions: [
      { label: '安全剂量', weight: '75g', light: TrafficLight.GREEN },
      { label: '高剂量', weight: '182g', light: TrafficLight.RED }
    ]
  },
  { 
    id: 'veg-6', nameZh: '土豆', nameEn: 'Potato', category: FoodCategory.VEGETABLES, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f02bad675?w=200&h=200&fit=crop',
    reason: 'FODMAP 含量极低。',
    portions: [{ label: '不限量', weight: '不限量', light: TrafficLight.GREEN }]
  },
  { 
    id: 'veg-7', nameZh: '番茄 (普通)', nameEn: 'Tomato', category: FoodCategory.VEGETABLES, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1591189863430-ab87e120f312?w=200&h=200&fit=crop',
    reason: '普通番茄安全，但注意圣女果剂量。',
    portions: [
      { label: '安全剂量', weight: '65g', light: TrafficLight.GREEN },
      { label: '圣女果(高剂量)', weight: '13个', light: TrafficLight.RED }
    ]
  },

  // --- 水果类 ---
  { 
    id: 'fruit-1', nameZh: '苹果', nameEn: 'Apple', category: FoodCategory.FRUITS, 
    baseLight: TrafficLight.RED, personalizedLight: TrafficLight.RED,
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?w=200&h=200&fit=crop',
    reason: '富含果糖和山梨糖醇。',
    portions: [
      { label: '极少量', weight: '20g', light: TrafficLight.GREEN },
      { label: '中等苹果', weight: '150g', light: TrafficLight.RED }
    ]
  },
  { 
    id: 'fruit-2', nameZh: '成熟香蕉', nameEn: 'Ripe Banana', category: FoodCategory.FRUITS, 
    baseLight: TrafficLight.YELLOW, personalizedLight: TrafficLight.YELLOW,
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ad996211fdf4?w=200&h=200&fit=crop',
    reason: '香蕉成熟度越高，果聚糖含量越高。建议食用稍微发绿的香蕉。',
    portions: [
      { label: '成熟香蕉(少量)', weight: '35g', light: TrafficLight.GREEN },
      { label: '成熟香蕉(1根)', weight: '100g', light: TrafficLight.RED }
    ]
  },
  { 
    id: 'fruit-3', nameZh: '坚挺香蕉 (略绿)', nameEn: 'Firm Banana', category: FoodCategory.FRUITS, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=200&h=200&fit=crop',
    reason: '抗性淀粉含量高，果聚糖较低。',
    portions: [{ label: '1 根', weight: '100g', light: TrafficLight.GREEN }]
  },
  { 
    id: 'fruit-4', nameZh: '蓝莓', nameEn: 'Blueberries', category: FoodCategory.FRUITS, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=200&h=200&fit=crop',
    reason: '安全分量内不含过高果聚糖。',
    portions: [
      { label: '安全分量', weight: '40g', light: TrafficLight.GREEN },
      { label: '高分量', weight: '200g', light: TrafficLight.RED }
    ]
  },
  { 
    id: 'fruit-5', nameZh: '草莓', nameEn: 'Strawberries', category: FoodCategory.FRUITS, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&h=200&fit=crop',
    reason: 'FODMAP 含量低。',
    portions: [{ label: '不限量', weight: '不限量', light: TrafficLight.GREEN }]
  },
  { 
    id: 'fruit-6', nameZh: '橙子', nameEn: 'Orange', category: FoodCategory.FRUITS, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=200&h=200&fit=crop',
    reason: '不含 FODMAP。',
    portions: [{ label: '1 个', weight: '130g', light: TrafficLight.GREEN }]
  },

  // --- 乳制品 ---
  { 
    id: 'dairy-1', nameZh: '全脂牛奶', nameEn: 'Whole Milk', category: FoodCategory.DAIRY_SOY_LACTOSE_FREE, 
    baseLight: TrafficLight.RED, personalizedLight: TrafficLight.RED,
    imageUrl: 'https://images.unsplash.com/photo-1550583724-1255818c053b?w=200&h=200&fit=crop',
    reason: '高乳糖。',
    portions: [{ label: '1 杯', weight: '250g', light: TrafficLight.RED }]
  },
  { 
    id: 'dairy-2', nameZh: '无乳糖牛奶', nameEn: 'Lactose-free Milk', category: FoodCategory.DAIRY_SOY_LACTOSE_FREE, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?w=200&h=200&fit=crop',
    reason: '已通过乳糖酶处理，非常安全。',
    portions: [{ label: '1 杯', weight: '250g', light: TrafficLight.GREEN }]
  },
  { 
    id: 'dairy-3', nameZh: '切达奶酪 (硬质)', nameEn: 'Cheddar Cheese', category: FoodCategory.DAIRY_SOY_LACTOSE_FREE, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1618067424219-51b63c2c83d5?w=200&h=200&fit=crop',
    reason: '硬质奶酪在发酵过程中去除了大部分乳糖。',
    portions: [{ label: '2 片', weight: '40g', light: TrafficLight.GREEN }]
  },

  // --- 谷物类 ---
  { 
    id: 'grain-1', nameZh: '全麦面包', nameEn: 'Whole Wheat Bread', category: FoodCategory.BREAD_CEREALS_RICE_PASTA, 
    baseLight: TrafficLight.RED, personalizedLight: TrafficLight.RED,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop',
    reason: '高含量果聚糖。',
    portions: [
      { label: '极少量', weight: '1片(24g)', light: TrafficLight.YELLOW },
      { label: '正常分量', weight: '2片(48g)', light: TrafficLight.RED }
    ]
  },
  { 
    id: 'grain-2', nameZh: '酸种面包 (拼写小麦)', nameEn: 'Sourdough Spelt Bread', category: FoodCategory.BREAD_CEREALS_RICE_PASTA, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=200&h=200&fit=crop',
    reason: '传统发酵过程分解了果聚糖。',
    portions: [{ label: '2 片', weight: '52g', light: TrafficLight.GREEN }]
  },
  { 
    id: 'grain-3', nameZh: '白米饭', nameEn: 'White Rice', category: FoodCategory.BREAD_CEREALS_RICE_PASTA, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=200&h=200&fit=crop',
    reason: 'FODMAP 含量极低。',
    portions: [{ label: '1 碗', weight: '190g', light: TrafficLight.GREEN }]
  },
  { 
    id: 'grain-4', nameZh: '燕麦 (传统)', nameEn: 'Rolled Oats', category: FoodCategory.BREAD_CEREALS_RICE_PASTA, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddf13cf?w=200&h=200&fit=crop',
    reason: '安全剂量内。',
    portions: [
      { label: '安全剂量', weight: '52g', light: TrafficLight.GREEN },
      { label: '高剂量', weight: '78g', light: TrafficLight.RED }
    ]
  },

  // --- 蛋白质/豆类 ---
  { 
    id: 'prot-1', nameZh: '硬豆腐', nameEn: 'Firm Tofu', category: FoodCategory.PULSES_TOFU_NUTS, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop',
    reason: '在加工过程中，导致腹胀的低聚糖 (GOS) 随水分流失了。注意：嫩豆腐是红灯。',
    portions: [{ label: '正常分量', weight: '170g', light: TrafficLight.GREEN }]
  },
  { 
    id: 'prot-2', nameZh: '嫩豆腐', nameEn: 'Silken Tofu', category: FoodCategory.PULSES_TOFU_NUTS, 
    baseLight: TrafficLight.RED, personalizedLight: TrafficLight.RED,
    imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=200&h=200&fit=crop',
    reason: '保留了大量低聚糖 (GOS)。',
    portions: [{ label: '正常分量', weight: '170g', light: TrafficLight.RED }]
  },
  { 
    id: 'prot-3', nameZh: '鸡蛋', nameEn: 'Eggs', category: FoodCategory.MEAT_FISH_EGGS_OILS, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1582722872445-44ad5c789460?w=200&h=200&fit=crop',
    reason: '蛋白质不含碳水化合物，因此不含 FODMAP。',
    portions: [{ label: '2 个', weight: '114g', light: TrafficLight.GREEN }]
  },
  { 
    id: 'prot-4', nameZh: '鹰嘴豆 (罐装)', nameEn: 'Chickpeas (Canned)', category: FoodCategory.PULSES_TOFU_NUTS, 
    baseLight: TrafficLight.YELLOW, personalizedLight: TrafficLight.YELLOW,
    imageUrl: 'https://images.unsplash.com/photo-1585914641050-fa9883c4e21c?w=200&h=200&fit=crop',
    reason: '罐装并冲洗可以大幅降低 GOS 含量。',
    portions: [
      { label: '安全剂量', weight: '42g', light: TrafficLight.GREEN },
      { label: '中剂量', weight: '84g', light: TrafficLight.RED }
    ]
  },

  // --- 调味品 ---
  { 
    id: 'cond-1', nameZh: '蜂蜜', nameEn: 'Honey', category: FoodCategory.CONDIMENTS, 
    baseLight: TrafficLight.RED, personalizedLight: TrafficLight.RED,
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&h=200&fit=crop',
    reason: '极高果糖含量。',
    portions: [
      { label: '极少量', weight: '1茶匙(7g)', light: TrafficLight.GREEN },
      { label: '正常分量', weight: '1汤匙(28g)', light: TrafficLight.RED }
    ]
  },
  { 
    id: 'cond-2', nameZh: '枫糖浆', nameEn: 'Maple Syrup', category: FoodCategory.CONDIMENTS, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=200&h=200&fit=crop',
    reason: '果糖含量低，非常安全的甜味剂替代品。',
    portions: [{ label: '2 汤匙', weight: '50g', light: TrafficLight.GREEN }]
  },
  { 
    id: 'cond-3', nameZh: '大蒜油', nameEn: 'Garlic Olive Oil', category: FoodCategory.MEAT_FISH_EGGS_OILS, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop',
    reason: 'FODMAPs 是水溶性的，不是脂溶性的。大蒜的香味能融入油中，但导致腹胀的碳水化合物不会。',
    portions: [{ label: '1 汤匙', weight: '18g', light: TrafficLight.GREEN }]
  }
];

export const SYMPTOM_OPTIONS = ['腹胀 (Bloating)', '腹痛 (Pain)', '腹泻 (Diarrhea)', '关节痛 (Joint Pain)', '晨僵 (Stiffness)'];
