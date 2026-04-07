// 95 DSA Patterns - Comprehensive Question Bank
// Covers all major patterns for FAANG interview prep

export interface PatternQuestion {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  pattern: string;
  patternCategory: string;
  leetCodeUrl: string;
  problem_description: string;
  constraints: string[];
  example_input: string;
  example_output: string;
  hints: string[];
  solution_explanation: string;
  time_complexity: string;
  space_complexity: string;
  companies?: string[];
  relatedPatterns?: string[];
}

export interface PatternInfo {
  id: string;
  name: string;
  description: string;
  whenToUse: string;
  keyCharacteristics: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  completedCount?: number;
}

export interface PatternCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  patterns: PatternInfo[];
}

// 95 Pattern Definitions
export const NINETY_FIVE_PATTERNS: Record<string, PatternInfo> = {
  // Array & String (1-12)
  two_sum: { id: 'two_sum', name: 'Two Sum', description: 'Find pair with target sum using hash map', whenToUse: 'When you need to find if two numbers sum to target', keyCharacteristics: ['Hash map for O(1) lookup', 'Complement calculation', 'Single pass or two pass'], difficulty: 'easy', questionCount: 5 },
  kadane: { id: 'kadane', name: 'Kadane\'s Algorithm', description: 'Maximum subarray sum', whenToUse: 'Maximum/minimum subarray problems', keyCharacteristics: ['Track local and global max', 'Reset when negative', 'Greedy approach'], difficulty: 'medium', questionCount: 4 },
  prefix_suffix: { id: 'prefix_suffix', name: 'Prefix/Suffix Products', description: 'Calculate products excluding self', whenToUse: 'When you need product/sum excluding current element', keyCharacteristics: ['Left pass + Right pass', 'O(1) extra space', 'Build result in place'], difficulty: 'medium', questionCount: 3 },
  hash_set: { id: 'hash_set', name: 'Hash Set Pattern', description: 'Track unique elements', whenToUse: 'Duplicate detection, uniqueness check', keyCharacteristics: ['O(1) lookup', 'Set operations', 'Linear scan'], difficulty: 'easy', questionCount: 4 },
  rotated_array: { id: 'rotated_array', name: 'Rotated Array Search', description: 'Search in rotated sorted array', whenToUse: 'Modified binary search on rotated arrays', keyCharacteristics: ['Find sorted half', 'Determine target location', 'Adjust pointers'], difficulty: 'medium', questionCount: 5 },
  two_pointers_sum: { id: 'two_pointers_sum', name: 'Two Pointers Sum', description: 'Find triplets/quadruplets with target sum', whenToUse: '3Sum, 4Sum, kSum problems', keyCharacteristics: ['Sort first', 'Skip duplicates', 'Two pointers for remaining'], difficulty: 'medium', questionCount: 6 },
  two_pointers_shrink: { id: 'two_pointers_shrink', name: 'Shrinkable Window', description: 'Move pointers based on condition', whenToUse: 'Container problems, trapping water', keyCharacteristics: ['Start from ends', 'Move based on constraint', 'Track max/min'], difficulty: 'medium', questionCount: 4 },
  cyclic_sort: { id: 'cyclic_sort', name: 'Cyclic Sort', description: 'Place elements at correct indices', whenToUse: 'Find missing/duplicate numbers in range', keyCharacteristics: ['Index as hash key', 'Swap to correct position', 'In-place'], difficulty: 'medium', questionCount: 5 },
  
  // Two Pointers (13-20)
  valid_palindrome: { id: 'valid_palindrome', name: 'Valid Palindrome', description: 'Check if string is palindrome', whenToUse: 'Palindrome validation with cleaning', keyCharacteristics: ['Two pointers', 'Skip non-alphanumeric', 'Case insensitive'], difficulty: 'easy', questionCount: 3 },
  merge_sorted: { id: 'merge_sorted', name: 'Merge Sorted', description: 'Merge two sorted arrays/lists', whenToUse: 'Merging sorted data structures', keyCharacteristics: ['Compare elements', 'Handle remainders', 'O(1) or O(n) space'], difficulty: 'easy', questionCount: 4 },
  dutch_national_flag: { id: 'dutch_national_flag', name: 'Dutch National Flag', description: 'Sort array of 0s, 1s, 2s', whenToUse: 'Three-way partitioning', keyCharacteristics: ['Three pointers', 'In-place swap', 'Group by value'], difficulty: 'medium', questionCount: 3 },
  fast_slow: { id: 'fast_slow', name: 'Fast & Slow Pointers', description: 'Detect cycles, find middle', whenToUse: 'Cycle detection, middle element', keyCharacteristics: ['Different speeds', 'Meeting point', 'Cycle properties'], difficulty: 'medium', questionCount: 5 },
  
  // Sliding Window (21-30)
  fixed_window: { id: 'fixed_window', name: 'Fixed Window', description: 'Process fixed-size subarrays', whenToUse: 'Subarray of size k problems', keyCharacteristics: ['Window size fixed', 'Slide one by one', 'Update running sum/count'], difficulty: 'easy', questionCount: 5 },
  flexible_window: { id: 'flexible_window', name: 'Flexible Window', description: 'Expand/shrink based on condition', whenToUse: 'Longest/shortest substring with condition', keyCharacteristics: ['Expand right', 'Shrink from left', 'Track condition'], difficulty: 'medium', questionCount: 8 },
  count_window: { id: 'count_window', name: 'Count-based Window', description: 'Track character/count frequencies', whenToUse: 'Anagram, permutation problems', keyCharacteristics: ['Hash map for counts', 'Match count tracking', 'Valid window detection'], difficulty: 'medium', questionCount: 6 },
  min_window: { id: 'min_window', name: 'Minimum Window Substring', description: 'Smallest window containing all chars', whenToUse: 'Minimum window with required elements', keyCharacteristics: ['Two hash maps', 'Formed count', 'Shrink when valid'], difficulty: 'hard', questionCount: 4 },
  
  // Binary Search (31-40)
  binary_basic: { id: 'binary_basic', name: 'Basic Binary Search', description: 'Standard binary search', whenToUse: 'Search in sorted array', keyCharacteristics: ['Left <= right', 'Mid calculation', 'Adjust bounds'], difficulty: 'easy', questionCount: 5 },
  binary_boundary: { id: 'binary_boundary', name: 'Boundary Binary Search', description: 'Find first/last occurrence', whenToUse: 'Duplicate elements, range search', keyCharacteristics: ['Track answer', 'Adjust based on need', 'Post-processing'], difficulty: 'medium', questionCount: 6 },
  binary_2d: { id: 'binary_2d', name: '2D Binary Search', description: 'Search in sorted matrix', whenToUse: 'Search in 2D sorted structures', keyCharacteristics: ['Treat as 1D', 'Row/col mapping', 'Multiple BS'], difficulty: 'medium', questionCount: 4 },
  binary_answer: { id: 'binary_answer', name: 'Binary Search on Answer', description: 'Search in answer space', whenToUse: 'Minimize maximum, capacity problems', keyCharacteristics: ['Define feasible function', 'Search range of answers', 'Greedy check'], difficulty: 'medium', questionCount: 8 },
  binary_rotated: { id: 'binary_rotated', name: 'Rotated Array BS', description: 'Binary search on rotated', whenToUse: 'Rotated sorted arrays', keyCharacteristics: ['Find sorted half', 'Compare with target', 'Adjust search space'], difficulty: 'medium', questionCount: 4 },
  
  // BFS (41-48)
  level_order: { id: 'level_order', name: 'Level Order Traversal', description: 'Process tree level by level', whenToUse: 'Tree/graph level processing', keyCharacteristics: ['Queue', 'Track level size', 'Process all at level'], difficulty: 'easy', questionCount: 6 },
  shortest_path: { id: 'shortest_path', name: 'Shortest Path (BFS)', description: 'Find shortest path in unweighted graph', whenToUse: 'Unweighted graph shortest path', keyCharacteristics: ['Queue', 'Visited set', 'Track distance'], difficulty: 'medium', questionCount: 7 },
  word_ladder: { id: 'word_ladder', name: 'Word Ladder', description: 'Transform word with single char changes', whenToUse: 'Word transformation problems', keyCharacteristics: ['Pattern matching', 'Build adjacency', 'Bidirectional BFS'], difficulty: 'hard', questionCount: 3 },
  island_count: { id: 'island_count', name: 'Island Count', description: 'Count connected components', whenToUse: 'Grid traversal, connected regions', keyCharacteristics: ['Mark visited', '4-directional', 'BFS/DFS'], difficulty: 'medium', questionCount: 8 },
  
  // DFS (49-56)
  tree_dfs: { id: 'tree_dfs', name: 'Tree DFS', description: 'Pre/in/post-order traversal', whenToUse: 'Tree exploration', keyCharacteristics: ['Recursion/stack', 'Track path', 'Post-order for results'], difficulty: 'easy', questionCount: 8 },
  graph_dfs: { id: 'graph_dfs', name: 'Graph DFS', description: 'Explore all paths', whenToUse: 'Path finding, cycle detection', keyCharacteristics: ['Visited set', 'Recursion stack', 'Backtracking'], difficulty: 'medium', questionCount: 7 },
  clone_graph: { id: 'clone_graph', name: 'Clone Graph', description: 'Deep copy of graph', whenToUse: 'Graph copying', keyCharacteristics: ['Hash map', 'DFS/BFS', 'Track visited'], difficulty: 'medium', questionCount: 4 },
  topological_sort: { id: 'topological_sort', name: 'Topological Sort', description: 'Ordering with dependencies', whenToUse: 'Course schedule, task ordering', keyCharacteristics: ['In-degree count', 'Kahn\'s algorithm', 'DFS with states'], difficulty: 'medium', questionCount: 5 },
  
  // Dynamic Programming (57-68)
  dp_1d: { id: 'dp_1d', name: '1D DP', description: 'Linear dynamic programming', whenToUse: 'Linear optimization problems', keyCharacteristics: ['dp[i] definition', 'State transition', 'Base cases'], difficulty: 'easy', questionCount: 10 },
  dp_2d: { id: 'dp_2d', name: '2D DP', description: 'Grid/double sequence DP', whenToUse: 'Two sequences, grid paths', keyCharacteristics: ['dp[i][j] definition', 'Nested loops', 'Space optimization'], difficulty: 'medium', questionCount: 12 },
  dp_knapsack: { id: 'dp_knapsack', name: 'Knapsack Pattern', description: 'Subset sum, 0/1 knapsack', whenToUse: 'Selection with constraints', keyCharacteristics: ['Include/exclude choice', 'Weight/value tracking', 'Space optimization'], difficulty: 'medium', questionCount: 6 },
  dp_lis: { id: 'dp_lis', name: 'LIS Pattern', description: 'Longest Increasing Subsequence', whenToUse: 'Subsequence problems', keyCharacteristics: ['dp[i] = length ending at i', 'Binary search optimization', 'Patience sort'], difficulty: 'medium', questionCount: 5 },
  dp_interval: { id: 'dp_interval', name: 'Interval DP', description: 'DP on intervals', whenToUse: 'Burst balloons, matrix chain', keyCharacteristics: ['Try all splits', 'dp[i][j] on interval', 'Combine results'], difficulty: 'hard', questionCount: 4 },
  dp_state_machine: { id: 'dp_state_machine', name: 'State Machine DP', description: 'Multiple states', whenToUse: 'Stock trading, buy/sell', keyCharacteristics: ['Track multiple states', 'State transitions', 'Buy/sell actions'], difficulty: 'hard', questionCount: 5 },
  
  // Linked List (69-76)
  ll_reverse: { id: 'll_reverse', name: 'Reverse Linked List', description: 'Reverse pointers', whenToUse: 'List reversal', keyCharacteristics: ['Three pointers', 'Iterative/recursive', 'Handle head'], difficulty: 'easy', questionCount: 6 },
  ll_merge: { id: 'll_merge', name: 'Merge Lists', description: 'Combine sorted lists', whenToUse: 'Merging linked lists', keyCharacteristics: ['Dummy node', 'Compare and attach', 'Handle remainders'], difficulty: 'easy', questionCount: 5 },
  ll_cycle: { id: 'll_cycle', name: 'Floyd\'s Cycle', description: 'Detect and find cycle', whenToUse: 'Cycle detection', keyCharacteristics: ['Slow/fast pointers', 'Meeting point', 'Find start'], difficulty: 'medium', questionCount: 4 },
  ll_reorder: { id: 'll_reorder', name: 'Reorder List', description: 'Rearrange nodes', whenToUse: 'List manipulation', keyCharacteristics: ['Find middle', 'Reverse half', 'Merge'], difficulty: 'medium', questionCount: 4 },
  
  // Tree (77-84)
  tree_bst: { id: 'tree_bst', name: 'BST Operations', description: 'Binary Search Tree', whenToUse: 'BST validation, operations', keyCharacteristics: ['BST property', 'In-order traversal', 'Recursion'], difficulty: 'medium', questionCount: 8 },
  tree_lca: { id: 'tree_lca', name: 'Lowest Common Ancestor', description: 'Find LCA in tree', whenToUse: 'Common ancestor problems', keyCharacteristics: ['Recursive search', 'Return values', 'Ancestor tracking'], difficulty: 'medium', questionCount: 5 },
  tree_serialize: { id: 'tree_serialize', name: 'Serialize/Deserialize', description: 'Tree to string and back', whenToUse: 'Tree storage, reconstruction', keyCharacteristics: ['Pre-order', 'Marker for null', 'Build from string'], difficulty: 'medium', questionCount: 3 },
  tree_diameter: { id: 'tree_diameter', name: 'Tree Diameter', description: 'Longest path in tree', whenToUse: 'Longest path problems', keyCharacteristics: ['Height calculation', 'Diameter through node', 'Post-order'], difficulty: 'medium', questionCount: 4 },
  
  // Heap/Priority Queue (85-88)
  heap_top_k: { id: 'heap_top_k', name: 'Top K Elements', description: 'Find k largest/smallest', whenToUse: 'Kth largest, top frequent', keyCharacteristics: ['Min/max heap', 'Size k', 'Comparator'], difficulty: 'medium', questionCount: 6 },
  heap_merge: { id: 'heap_merge', name: 'Merge K Sorted', description: 'Merge with heap', whenToUse: 'Merging k sorted structures', keyCharacteristics: ['Min heap', 'Store index/source', 'Pop and push'], difficulty: 'medium', questionCount: 4 },
  heap_median: { id: 'heap_median', name: 'Running Median', description: 'Find median in stream', whenToUse: 'Dynamic median', keyCharacteristics: ['Two heaps', 'Max for lower, min for upper', 'Rebalance'], difficulty: 'hard', questionCount: 3 },
  
  // Backtracking (89-93)
  bt_permutation: { id: 'bt_permutation', name: 'Permutations', description: 'Generate all permutations', whenToUse: 'All arrangements', keyCharacteristics: ['Swap', 'Recursion', 'Backtrack'], difficulty: 'medium', questionCount: 5 },
  bt_combination: { id: 'bt_combination', name: 'Combinations', description: 'Generate all combinations', whenToUse: 'All subsets, combinations', keyCharacteristics: ['Include/exclude', 'Start index', 'Target sum'], difficulty: 'medium', questionCount: 8 },
  bt_n_queen: { id: 'bt_n_queen', name: 'N-Queens', description: 'Place queens safely', whenToUse: 'Constraint satisfaction', keyCharacteristics: ['Row by row', 'Check conflicts', 'Backtrack'], difficulty: 'hard', questionCount: 3 },
  bt_subsets: { id: 'bt_subsets', name: 'Subsets Pattern', description: 'Generate power set', whenToUse: 'All subsets', keyCharacteristics: ['Recursive tree', 'Include/exclude', 'Add at each step'], difficulty: 'medium', questionCount: 5 },
  
  // Intervals (94-95)
  interval_merge: { id: 'interval_merge', name: 'Merge Intervals', description: 'Combine overlapping', whenToUse: 'Interval consolidation', keyCharacteristics: ['Sort by start', 'Compare end with next start', 'Merge or add'], difficulty: 'medium', questionCount: 6 },
  interval_meeting: { id: 'interval_meeting', name: 'Meeting Rooms', description: 'Schedule intervals', whenToUse: 'Room allocation', keyCharacteristics: ['Sort by time', 'Count overlaps', 'Min rooms needed'], difficulty: 'medium', questionCount: 4 }
};

// Pattern Categories with organized patterns
export const PATTERN_CATEGORIES: PatternCategory[] = [
  {
    id: 'array_string',
    name: 'Array & String',
    description: 'Fundamental patterns for array and string manipulation',
    icon: '[]',
    color: '#3B82F6',
    patterns: [
      NINETY_FIVE_PATTERNS.two_sum,
      NINETY_FIVE_PATTERNS.kadane,
      NINETY_FIVE_PATTERNS.prefix_suffix,
      NINETY_FIVE_PATTERNS.hash_set,
      NINETY_FIVE_PATTERNS.rotated_array,
      NINETY_FIVE_PATTERNS.two_pointers_sum,
      NINETY_FIVE_PATTERNS.two_pointers_shrink,
      NINETY_FIVE_PATTERNS.cyclic_sort
    ]
  },
  {
    id: 'two_pointer',
    name: 'Two Pointers',
    description: 'Two index traversal techniques',
    icon: '👆',
    color: '#8B5CF6',
    patterns: [
      NINETY_FIVE_PATTERNS.valid_palindrome,
      NINETY_FIVE_PATTERNS.merge_sorted,
      NINETY_FIVE_PATTERNS.dutch_national_flag,
      NINETY_FIVE_PATTERNS.fast_slow
    ]
  },
  {
    id: 'sliding_window',
    name: 'Sliding Window',
    description: 'Efficient subarray processing',
    icon: '🪟',
    color: '#10B981',
    patterns: [
      NINETY_FIVE_PATTERNS.fixed_window,
      NINETY_FIVE_PATTERNS.flexible_window,
      NINETY_FIVE_PATTERNS.count_window,
      NINETY_FIVE_PATTERNS.min_window
    ]
  },
  {
    id: 'binary_search',
    name: 'Binary Search',
    description: 'Logarithmic search techniques',
    icon: '🔍',
    color: '#F59E0B',
    patterns: [
      NINETY_FIVE_PATTERNS.binary_basic,
      NINETY_FIVE_PATTERNS.binary_boundary,
      NINETY_FIVE_PATTERNS.binary_2d,
      NINETY_FIVE_PATTERNS.binary_answer,
      NINETY_FIVE_PATTERNS.binary_rotated
    ]
  },
  {
    id: 'bfs',
    name: 'BFS',
    description: 'Breadth-first traversal',
    icon: '🌊',
    color: '#06B6D4',
    patterns: [
      NINETY_FIVE_PATTERNS.level_order,
      NINETY_FIVE_PATTERNS.shortest_path,
      NINETY_FIVE_PATTERNS.word_ladder,
      NINETY_FIVE_PATTERNS.island_count
    ]
  },
  {
    id: 'dfs',
    name: 'DFS',
    description: 'Depth-first traversal',
    icon: '🔎',
    color: '#6366F1',
    patterns: [
      NINETY_FIVE_PATTERNS.tree_dfs,
      NINETY_FIVE_PATTERNS.graph_dfs,
      NINETY_FIVE_PATTERNS.clone_graph,
      NINETY_FIVE_PATTERNS.topological_sort
    ]
  },
  {
    id: 'dp',
    name: 'Dynamic Programming',
    description: 'Optimal substructure problems',
    icon: '🔄',
    color: '#EC4899',
    patterns: [
      NINETY_FIVE_PATTERNS.dp_1d,
      NINETY_FIVE_PATTERNS.dp_2d,
      NINETY_FIVE_PATTERNS.dp_knapsack,
      NINETY_FIVE_PATTERNS.dp_lis,
      NINETY_FIVE_PATTERNS.dp_interval,
      NINETY_FIVE_PATTERNS.dp_state_machine
    ]
  },
  {
    id: 'linked_list',
    name: 'Linked List',
    description: 'Pointer manipulation patterns',
    icon: '⛓️',
    color: '#14B8A6',
    patterns: [
      NINETY_FIVE_PATTERNS.ll_reverse,
      NINETY_FIVE_PATTERNS.ll_merge,
      NINETY_FIVE_PATTERNS.ll_cycle,
      NINETY_FIVE_PATTERNS.ll_reorder
    ]
  },
  {
    id: 'tree',
    name: 'Tree',
    description: 'Binary tree algorithms',
    icon: '🌳',
    color: '#22C55E',
    patterns: [
      NINETY_FIVE_PATTERNS.tree_bst,
      NINETY_FIVE_PATTERNS.tree_lca,
      NINETY_FIVE_PATTERNS.tree_serialize,
      NINETY_FIVE_PATTERNS.tree_diameter
    ]
  },
  {
    id: 'heap',
    name: 'Heap',
    description: 'Priority queue patterns',
    icon: '⛰️',
    color: '#F97316',
    patterns: [
      NINETY_FIVE_PATTERNS.heap_top_k,
      NINETY_FIVE_PATTERNS.heap_merge,
      NINETY_FIVE_PATTERNS.heap_median
    ]
  },
  {
    id: 'backtracking',
    name: 'Backtracking',
    description: 'Exhaustive search with pruning',
    icon: '↩️',
    color: '#EF4444',
    patterns: [
      NINETY_FIVE_PATTERNS.bt_permutation,
      NINETY_FIVE_PATTERNS.bt_combination,
      NINETY_FIVE_PATTERNS.bt_n_queen,
      NINETY_FIVE_PATTERNS.bt_subsets
    ]
  },
  {
    id: 'intervals',
    name: 'Intervals',
    description: 'Time range and scheduling',
    icon: '⏱️',
    color: '#8B5CF6',
    patterns: [
      NINETY_FIVE_PATTERNS.interval_merge,
      NINETY_FIVE_PATTERNS.interval_meeting
    ]
  }
];

// ============================================================================
// QUESTION BANK
// ============================================================================

let qid = 1;
const createQ = (data: Omit<PatternQuestion, 'id'>): PatternQuestion => ({ ...data, id: qid++ });

// Array questions (20)
const arrayQuestions: PatternQuestion[] = [
  createQ({ title: 'Two Sum', difficulty: 'easy', topic: 'arrays', pattern: 'two_sum', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/two-sum', problem_description: 'Find two numbers that add up to target', constraints: ['2 <= nums.length <= 10^4'], example_input: 'nums = [2,7,11,15], target = 9', example_output: '[0,1]', hints: ['Use hash map', 'Check for complement'], solution_explanation: 'Hash map: O(n) time, O(n) space', time_complexity: 'O(n)', space_complexity: 'O(n)', companies: ['Amazon', 'Google'] }),
  createQ({ title: 'Two Sum II', difficulty: 'medium', topic: 'arrays', pattern: 'two_sum', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted', problem_description: 'Two sum in sorted array', constraints: ['Array is sorted'], example_input: 'numbers = [2,7,11,15], target = 9', example_output: '[1,2]', hints: ['Two pointers', 'Use sorted property'], solution_explanation: 'Two pointers: O(n) time, O(1) space', time_complexity: 'O(n)', space_complexity: 'O(1)', companies: ['Amazon'] }),
  createQ({ title: '3Sum', difficulty: 'medium', topic: 'arrays', pattern: 'two_pointers_sum', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/3sum', problem_description: 'Find all unique triplets that sum to zero', constraints: ['3 <= nums.length <= 3000'], example_input: 'nums = [-1,0,1,2,-1,-4]', example_output: '[[-1,-1,2],[-1,0,1]]', hints: ['Sort first', 'Two pointers for remaining'], solution_explanation: 'Sort + Two pointers: O(n²) time', time_complexity: 'O(n²)', space_complexity: 'O(1)', companies: ['Facebook', 'Amazon'] }),
  createQ({ title: '3Sum Closest', difficulty: 'medium', topic: 'arrays', pattern: 'two_pointers_sum', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/3sum-closest', problem_description: 'Find triplet with sum closest to target', constraints: ['3 <= nums.length <= 500'], example_input: 'nums = [-1,2,1,-4], target = 1', example_output: '2', hints: ['Sort and use two pointers', 'Track closest difference'], solution_explanation: 'Two pointers: O(n²) time', time_complexity: 'O(n²)', space_complexity: 'O(1)' }),
  createQ({ title: '4Sum', difficulty: 'medium', topic: 'arrays', pattern: 'two_pointers_sum', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/4sum', problem_description: 'Find all unique quadruplets that sum to target', constraints: ['1 <= nums.length <= 200'], example_input: 'nums = [1,0,-1,0,-2,2], target = 0', example_output: '[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]', hints: ['Fix two and use two pointers', 'Skip duplicates'], solution_explanation: 'Two nested + two pointers: O(n³) time', time_complexity: 'O(n³)', space_complexity: 'O(1)' }),
  createQ({ title: 'Container With Most Water', difficulty: 'medium', topic: 'arrays', pattern: 'two_pointers_shrink', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/container-with-most-water', problem_description: 'Find two lines that hold most water', constraints: ['2 <= n <= 10^5'], example_input: 'height = [1,8,6,2,5,4,8,3,7]', example_output: '49', hints: ['Two pointers from ends', 'Move shorter pointer'], solution_explanation: 'Two pointers: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)', companies: ['Google', 'Amazon'] }),
  createQ({ title: 'Trapping Rain Water', difficulty: 'hard', topic: 'arrays', pattern: 'two_pointers_shrink', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/trapping-rain-water', problem_description: 'Calculate trapped rain water', constraints: ['n == height.length', '1 <= n <= 2 * 10^4'], example_input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', example_output: '6', hints: ['Two pointers', 'Track max left and right'], solution_explanation: 'Two pointers: O(n) time, O(1) space', time_complexity: 'O(n)', space_complexity: 'O(1)', companies: ['Amazon', 'Google', 'Facebook'] }),
  createQ({ title: 'Maximum Subarray', difficulty: 'medium', topic: 'arrays', pattern: 'kadane', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/maximum-subarray', problem_description: 'Find contiguous subarray with largest sum', constraints: ['1 <= nums.length <= 10^5'], example_input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', example_output: '6', hints: ['Kadane\'s algorithm', 'Track current and global max'], solution_explanation: 'Kadane: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)', companies: ['LinkedIn', 'Amazon'] }),
  createQ({ title: 'Maximum Product Subarray', difficulty: 'medium', topic: 'arrays', pattern: 'kadane', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/maximum-product-subarray', problem_description: 'Find subarray with maximum product', constraints: ['1 <= nums.length <= 2 * 10^4'], example_input: 'nums = [2,3,-2,4]', example_output: '6', hints: ['Track max and min product', 'Swap when negative'], solution_explanation: 'Track both: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Best Time to Buy/Sell Stock', difficulty: 'easy', topic: 'arrays', pattern: 'kadane', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock', problem_description: 'Max profit from one transaction', constraints: ['1 <= prices.length <= 10^5'], example_input: 'prices = [7,1,5,3,6,4]', example_output: '5', hints: ['Track min price', 'Calculate max profit'], solution_explanation: 'One pass: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)', companies: ['Amazon', 'Microsoft'] }),
  createQ({ title: 'Best Time to Buy/Sell Stock II', difficulty: 'medium', topic: 'arrays', pattern: 'kadane', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii', problem_description: 'Max profit with multiple transactions', constraints: ['1 <= prices.length <= 3 * 10^4'], example_input: 'prices = [7,1,5,3,6,4]', example_output: '7', hints: ['Sum all positive differences'], solution_explanation: 'Peak valley: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Product of Array Except Self', difficulty: 'medium', topic: 'arrays', pattern: 'prefix_suffix', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/product-of-array-except-self', problem_description: 'Product of all elements except self', constraints: ['2 <= nums.length <= 10^5'], example_input: 'nums = [1,2,3,4]', example_output: '[24,12,8,6]', hints: ['Prefix and suffix products', 'Build in place'], solution_explanation: 'Two pass: O(n) time, O(1) space', time_complexity: 'O(n)', space_complexity: 'O(1)', companies: ['Facebook', 'Amazon'] }),
  createQ({ title: 'Contains Duplicate', difficulty: 'easy', topic: 'arrays', pattern: 'hash_set', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/contains-duplicate', problem_description: 'Check if array contains duplicate', constraints: ['1 <= nums.length <= 10^5'], example_input: 'nums = [1,2,3,1]', example_output: 'true', hints: ['Use hash set'], solution_explanation: 'Hash set: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Contains Duplicate II', difficulty: 'easy', topic: 'arrays', pattern: 'hash_set', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/contains-duplicate-ii', problem_description: 'Duplicate within k distance', constraints: ['1 <= nums.length <= 10^5'], example_input: 'nums = [1,2,3,1], k = 3', example_output: 'true', hints: ['Hash map with index', 'Sliding window of size k'], solution_explanation: 'Hash map: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(k)' }),
  createQ({ title: 'Longest Consecutive Sequence', difficulty: 'medium', topic: 'arrays', pattern: 'hash_set', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence', problem_description: 'Longest consecutive elements sequence', constraints: ['0 <= nums.length <= 10^5'], example_input: 'nums = [100,4,200,1,3,2]', example_output: '4', hints: ['Hash set', 'Only start from sequence start'], solution_explanation: 'Hash set: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(n)', companies: ['Google', 'Amazon'] }),
  createQ({ title: 'Find Minimum in Rotated Sorted Array', difficulty: 'medium', topic: 'arrays', pattern: 'rotated_array', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array', problem_description: 'Find minimum in rotated sorted array', constraints: ['n == nums.length', '1 <= n <= 5000'], example_input: 'nums = [3,4,5,1,2]', example_output: '1', hints: ['Binary search', 'Find sorted half'], solution_explanation: 'Modified BS: O(log n) time', time_complexity: 'O(log n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Search in Rotated Sorted Array', difficulty: 'medium', topic: 'arrays', pattern: 'rotated_array', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array', problem_description: 'Search target in rotated sorted array', constraints: ['1 <= nums.length <= 5000'], example_input: 'nums = [4,5,6,7,0,1,2], target = 0', example_output: '4', hints: ['Binary search', 'Determine sorted half'], solution_explanation: 'Modified BS: O(log n) time', time_complexity: 'O(log n)', space_complexity: 'O(1)', companies: ['Facebook', 'Amazon'] }),
  createQ({ title: 'First Missing Positive', difficulty: 'hard', topic: 'arrays', pattern: 'cyclic_sort', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/first-missing-positive', problem_description: 'Find smallest missing positive integer', constraints: ['1 <= nums.length <= 5 * 10^5'], example_input: 'nums = [1,2,0]', example_output: '3', hints: ['Index as hash key', 'Cyclic sort'], solution_explanation: 'Index mapping: O(n) time, O(1) space', time_complexity: 'O(n)', space_complexity: 'O(1)', companies: ['Amazon', 'Microsoft'] }),
  createQ({ title: 'Find the Duplicate Number', difficulty: 'medium', topic: 'arrays', pattern: 'cyclic_sort', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/find-the-duplicate-number', problem_description: 'Find duplicate number in array', constraints: ['1 <= n <= 10^5'], example_input: 'nums = [1,3,4,2,2]', example_output: '2', hints: ['Floyd\'s cycle detection', 'Treat as linked list'], solution_explanation: 'Floyd: O(n) time, O(1) space', time_complexity: 'O(n)', space_complexity: 'O(1)', companies: ['Amazon', 'Google'] }),
  createQ({ title: 'Missing Number', difficulty: 'easy', topic: 'arrays', pattern: 'cyclic_sort', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/missing-number', problem_description: 'Find missing number in range', constraints: ['n == nums.length'], example_input: 'nums = [3,0,1]', example_output: '2', hints: ['Sum formula', 'XOR', 'Index swap'], solution_explanation: 'XOR or sum: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)' })
];

// String questions (15)
const stringQuestions: PatternQuestion[] = [
  createQ({ title: 'Valid Palindrome', difficulty: 'easy', topic: 'strings', pattern: 'valid_palindrome', patternCategory: 'two_pointer', leetCodeUrl: 'https://leetcode.com/problems/valid-palindrome', problem_description: 'Check if string is palindrome', constraints: ['1 <= s.length <= 2 * 10^5'], example_input: 's = "A man, a plan, a canal: Panama"', example_output: 'true', hints: ['Two pointers', 'Skip non-alphanumeric'], solution_explanation: 'Two pointers: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Valid Anagram', difficulty: 'easy', topic: 'strings', pattern: 'hash_set', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/valid-anagram', problem_description: 'Check if t is anagram of s', constraints: ['1 <= s.length <= 5 * 10^4'], example_input: 's = "anagram", t = "nagaram"', example_output: 'true', hints: ['Count frequencies'], solution_explanation: 'Hash map: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Group Anagrams', difficulty: 'medium', topic: 'strings', pattern: 'hash_set', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/group-anagrams', problem_description: 'Group anagrams together', constraints: ['1 <= strs.length <= 10^4'], example_input: 'strs = ["eat","tea","tan","ate","nat","bat"]', example_output: '[["bat"],["nat","tan"],["ate","eat","tea"]]', hints: ['Sorted string as key', 'Char count as key'], solution_explanation: 'Hash map: O(n*klogk) time', time_complexity: 'O(n*klogk)', space_complexity: 'O(n*k)', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Longest Substring Without Repeating', difficulty: 'medium', topic: 'strings', pattern: 'flexible_window', patternCategory: 'sliding_window', leetCodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters', problem_description: 'Find longest substring without repeating chars', constraints: ['0 <= s.length <= 5 * 10^4'], example_input: 's = "abcabcbb"', example_output: '3', hints: ['Sliding window', 'Hash set for window'], solution_explanation: 'Sliding window: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(min(m,n))', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Longest Repeating Char Replace', difficulty: 'medium', topic: 'strings', pattern: 'flexible_window', patternCategory: 'sliding_window', leetCodeUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement', problem_description: 'Longest substring with same letter after k changes', constraints: ['1 <= s.length <= 10^5'], example_input: 's = "ABAB", k = 2', example_output: '4', hints: ['Sliding window', 'Count most frequent'], solution_explanation: 'Sliding window: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Minimum Window Substring', difficulty: 'hard', topic: 'strings', pattern: 'min_window', patternCategory: 'sliding_window', leetCodeUrl: 'https://leetcode.com/problems/minimum-window-substring', problem_description: 'Minimum window containing all chars of t', constraints: ['m == s.length', 'n == t.length'], example_input: 's = "ADOBECODEBANC", t = "ABC"', example_output: '"BANC"', hints: ['Two hash maps', 'Formed count'], solution_explanation: 'Sliding window: O(m+n) time', time_complexity: 'O(m+n)', space_complexity: 'O(m+n)', companies: ['Facebook', 'LinkedIn'] }),
  createQ({ title: 'Valid Parentheses', difficulty: 'easy', topic: 'strings', pattern: 'stack', patternCategory: 'stack', leetCodeUrl: 'https://leetcode.com/problems/valid-parentheses', problem_description: 'Check if parentheses are valid', constraints: ['1 <= s.length <= 10^4'], example_input: 's = "()[]{}"', example_output: 'true', hints: ['Use stack', 'Match closing with top'], solution_explanation: 'Stack: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(n)', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Generate Parentheses', difficulty: 'medium', topic: 'strings', pattern: 'bt_combination', patternCategory: 'backtracking', leetCodeUrl: 'https://leetcode.com/problems/generate-parentheses', problem_description: 'Generate all valid parentheses', constraints: ['1 <= n <= 8'], example_input: 'n = 3', example_output: '["((()))","(()())","(())()","()(())","()()()"]', hints: ['Backtrack', 'Track open and close count'], solution_explanation: 'Backtracking: O(4^n/sqrt(n)) time', time_complexity: 'O(4^n/√n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Encode and Decode Strings', difficulty: 'medium', topic: 'strings', pattern: 'design', patternCategory: 'design', leetCodeUrl: 'https://leetcode.com/problems/encode-and-decode-strings', problem_description: 'Serialize/deserialize list of strings', constraints: ['Strings can contain any 256 ASCII'], example_input: 'strs = ["Hello","World"]', example_output: '"5#Hello5#World"', hints: ['Length prefix', 'Delimiter approach'], solution_explanation: 'Length delimiter: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Palindromic Substrings', difficulty: 'medium', topic: 'strings', pattern: 'expand_center', patternCategory: 'two_pointer', leetCodeUrl: 'https://leetcode.com/problems/palindromic-substrings', problem_description: 'Count palindromic substrings', constraints: ['1 <= s.length <= 1000'], example_input: 's = "abc"', example_output: '3', hints: ['Expand around center', 'Odd and even lengths'], solution_explanation: 'Expand center: O(n²) time', time_complexity: 'O(n²)', space_complexity: 'O(1)' }),
  createQ({ title: 'Longest Palindromic Substring', difficulty: 'medium', topic: 'strings', pattern: 'expand_center', patternCategory: 'two_pointer', leetCodeUrl: 'https://leetcode.com/problems/longest-palindromic-substring', problem_description: 'Find longest palindromic substring', constraints: ['1 <= s.length <= 1000'], example_input: 's = "babad"', example_output: '"bab"', hints: ['Expand around center'], solution_explanation: 'Expand center: O(n²) time', time_complexity: 'O(n²)', space_complexity: 'O(1)' }),
  createQ({ title: 'Substring with Concatenation', difficulty: 'hard', topic: 'strings', pattern: 'fixed_window', patternCategory: 'sliding_window', leetCodeUrl: 'https://leetcode.com/problems/substring-with-concatenation-of-all-words', problem_description: 'Find substring that is concatenation of all words', constraints: ['1 <= s.length <= 10^4'], example_input: 's = "barfoothefoobarman", words = ["foo","bar"]', example_output: '[0,9]', hints: ['Sliding window', 'Word count map'], solution_explanation: 'Sliding window: O(n*m) time', time_complexity: 'O(n*m)', space_complexity: 'O(m)' }),
  createQ({ title: 'Repeated DNA Sequences', difficulty: 'medium', topic: 'strings', pattern: 'fixed_window', patternCategory: 'sliding_window', leetCodeUrl: 'https://leetcode.com/problems/repeated-dna-sequences', problem_description: 'Find all 10-letter-long sequences that occur >1', constraints: ['1 <= s.length <= 10^5'], example_input: 's = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"', example_output: '["AAAAACCCCC","CCCCCAAAAA"]', hints: ['Hash set', 'Rolling hash'], solution_explanation: 'Sliding window: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Letter Combinations Phone', difficulty: 'medium', topic: 'strings', pattern: 'bt_combination', patternCategory: 'backtracking', leetCodeUrl: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number', problem_description: 'All letter combinations from phone digits', constraints: ['0 <= digits.length <= 4'], example_input: 'digits = "23"', example_output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]', hints: ['Backtrack', 'Map digits to letters'], solution_explanation: 'Backtracking: O(4^n) time', time_complexity: 'O(4^n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Word Break', difficulty: 'medium', topic: 'strings', pattern: 'dp_1d', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/word-break', problem_description: 'Check if string can be segmented', constraints: ['1 <= s.length <= 300'], example_input: 's = "leetcode", wordDict = ["leet","code"]', example_output: 'true', hints: ['DP', 'Check all prefixes'], solution_explanation: 'DP: O(n²) time', time_complexity: 'O(n²)', space_complexity: 'O(n)', companies: ['Amazon', 'Facebook'] })
];

// Binary Search questions (12)
const binarySearchQuestions: PatternQuestion[] = [
  createQ({ title: 'Binary Search', difficulty: 'easy', topic: 'binary_search', pattern: 'binary_basic', patternCategory: 'binary_search', leetCodeUrl: 'https://leetcode.com/problems/binary-search', problem_description: 'Search in sorted array', constraints: ['1 <= nums.length <= 10^4'], example_input: 'nums = [-1,0,3,5,9,12], target = 9', example_output: '4', hints: ['left <= right', 'mid calculation'], solution_explanation: 'Standard BS: O(log n) time', time_complexity: 'O(log n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Search Insert Position', difficulty: 'easy', topic: 'binary_search', pattern: 'binary_basic', patternCategory: 'binary_search', leetCodeUrl: 'https://leetcode.com/problems/search-insert-position', problem_description: 'Find index to insert target', constraints: ['1 <= nums.length <= 10^4'], example_input: 'nums = [1,3,5,6], target = 5', example_output: '2', hints: ['Find first >= target'], solution_explanation: 'Lower bound: O(log n) time', time_complexity: 'O(log n)', space_complexity: 'O(1)' }),
  createQ({ title: 'First Bad Version', difficulty: 'easy', topic: 'binary_search', pattern: 'binary_boundary', patternCategory: 'binary_search', leetCodeUrl: 'https://leetcode.com/problems/first-bad-version', problem_description: 'Find first bad version', constraints: ['1 <= bad <= n <= 2^31 - 1'], example_input: 'n = 5, bad = 4', example_output: '4', hints: ['Binary search', 'First true condition'], solution_explanation: 'BS: O(log n) time', time_complexity: 'O(log n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Find First and Last Position', difficulty: 'medium', topic: 'binary_search', pattern: 'binary_boundary', patternCategory: 'binary_search', leetCodeUrl: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array', problem_description: 'Find range of target', constraints: ['0 <= nums.length <= 10^5'], example_input: 'nums = [5,7,7,8,8,10], target = 8', example_output: '[3,4]', hints: ['Two binary searches'], solution_explanation: 'Two BS: O(log n) time', time_complexity: 'O(log n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Search a 2D Matrix', difficulty: 'medium', topic: 'binary_search', pattern: 'binary_2d', patternCategory: 'binary_search', leetCodeUrl: 'https://leetcode.com/problems/search-a-2d-matrix', problem_description: 'Search in sorted 2D matrix', constraints: ['m == matrix.length'], example_input: 'matrix = [[1,3,5,7],[10,11,16,20]], target = 3', example_output: 'true', hints: ['Treat as 1D array'], solution_explanation: 'Virtual 1D: O(log(m*n)) time', time_complexity: 'O(log(m*n))', space_complexity: 'O(1)' }),
  createQ({ title: 'Search a 2D Matrix II', difficulty: 'medium', topic: 'binary_search', pattern: 'binary_2d', patternCategory: 'binary_search', leetCodeUrl: 'https://leetcode.com/problems/search-a-2d-matrix-ii', problem_description: 'Search in sorted 2D matrix II', constraints: ['m == matrix.length'], example_input: 'matrix = [[1,4,7],[2,5,8],[3,6,9]], target = 5', example_output: 'true', hints: ['Start from top-right'], solution_explanation: 'Staircase: O(m+n) time', time_complexity: 'O(m+n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Find Peak Element', difficulty: 'medium', topic: 'binary_search', pattern: 'binary_peak', patternCategory: 'binary_search', leetCodeUrl: 'https://leetcode.com/problems/find-peak-element', problem_description: 'Find peak element', constraints: ['1 <= nums.length <= 1000'], example_input: 'nums = [1,2,3,1]', example_output: '2', hints: ['Binary search on slope'], solution_explanation: 'BS: O(log n) time', time_complexity: 'O(log n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Koko Eating Bananas', difficulty: 'medium', topic: 'binary_search', pattern: 'binary_answer', patternCategory: 'binary_search', leetCodeUrl: 'https://leetcode.com/problems/koko-eating-bananas', problem_description: 'Min eating speed to finish in h hours', constraints: ['1 <= piles.length <= 10^4'], example_input: 'piles = [3,6,7,11], h = 8', example_output: '4', hints: ['BS on speed', 'Check feasibility'], solution_explanation: 'BS on answer: O(n log(max)) time', time_complexity: 'O(n log(max))', space_complexity: 'O(1)' }),
  createQ({ title: 'Capacity To Ship Packages', difficulty: 'medium', topic: 'binary_search', pattern: 'binary_answer', patternCategory: 'binary_search', leetCodeUrl: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days', problem_description: 'Min capacity to ship in D days', constraints: ['1 <= days <= weights.length'], example_input: 'weights = [1,2,3,4,5,6,7,8,9,10], days = 5', example_output: '15', hints: ['BS on capacity'], solution_explanation: 'BS on answer: O(n log(sum)) time', time_complexity: 'O(n log(sum))', space_complexity: 'O(1)' }),
  createQ({ title: 'Split Array Largest Sum', difficulty: 'hard', topic: 'binary_search', pattern: 'binary_answer', patternCategory: 'binary_search', leetCodeUrl: 'https://leetcode.com/problems/split-array-largest-sum', problem_description: 'Minimize largest subarray sum with m splits', constraints: ['1 <= nums.length <= 1000'], example_input: 'nums = [7,2,5,10,8], m = 2', example_output: '18', hints: ['BS on largest sum'], solution_explanation: 'BS on answer: O(n log(sum)) time', time_complexity: 'O(n log(sum))', space_complexity: 'O(1)' }),
  createQ({ title: 'Median of Two Sorted Arrays', difficulty: 'hard', topic: 'binary_search', pattern: 'binary_partition', patternCategory: 'binary_search', leetCodeUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays', problem_description: 'Find median of two sorted arrays', constraints: ['0 <= m, n <= 10^6'], example_input: 'nums1 = [1,3], nums2 = [2]', example_output: '2.0', hints: ['Binary search partition'], solution_explanation: 'BS partition: O(log(min(m,n))) time', time_complexity: 'O(log(min(m,n)))', space_complexity: 'O(1)', companies: ['Amazon', 'Google', 'Facebook'] }),
  createQ({ title: 'Find Minimum in Rotated II', difficulty: 'hard', topic: 'binary_search', pattern: 'binary_rotated', patternCategory: 'binary_search', leetCodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii', problem_description: 'Find min with duplicates', constraints: ['n == nums.length'], example_input: 'nums = [2,2,2,0,1]', example_output: '0', hints: ['Handle duplicates'], solution_explanation: 'BS: O(log n) avg, O(n) worst', time_complexity: 'O(log n)', space_complexity: 'O(1)' })
];

// Linked List questions (10)
const linkedListQuestions: PatternQuestion[] = [
  createQ({ title: 'Reverse Linked List', difficulty: 'easy', topic: 'linked_list', pattern: 'll_reverse', patternCategory: 'linked_list', leetCodeUrl: 'https://leetcode.com/problems/reverse-linked-list', problem_description: 'Reverse a linked list', constraints: ['0 <= nodes <= 5000'], example_input: 'head = [1,2,3,4,5]', example_output: '[5,4,3,2,1]', hints: ['Three pointers'], solution_explanation: 'Iterative: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Merge Two Sorted Lists', difficulty: 'easy', topic: 'linked_list', pattern: 'll_merge', patternCategory: 'linked_list', leetCodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists', problem_description: 'Merge two sorted lists', constraints: ['0 <= list1.length, list2.length <= 50'], example_input: 'list1 = [1,2,4], list2 = [1,3,4]', example_output: '[1,1,2,3,4,4]', hints: ['Dummy node'], solution_explanation: 'Iterative: O(n+m) time', time_complexity: 'O(n+m)', space_complexity: 'O(1)', companies: ['Amazon', 'Microsoft'] }),
  createQ({ title: 'Linked List Cycle', difficulty: 'easy', topic: 'linked_list', pattern: 'll_cycle', patternCategory: 'linked_list', leetCodeUrl: 'https://leetcode.com/problems/linked-list-cycle', problem_description: 'Detect cycle in list', constraints: ['0 <= nodes <= 10^4'], example_input: 'head = [3,2,0,-4], pos = 1', example_output: 'true', hints: ['Floyd cycle'], solution_explanation: 'Floyd: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Linked List Cycle II', difficulty: 'medium', topic: 'linked_list', pattern: 'll_cycle', patternCategory: 'linked_list', leetCodeUrl: 'https://leetcode.com/problems/linked-list-cycle-ii', problem_description: 'Find where cycle begins', constraints: ['0 <= nodes <= 10^4'], example_input: 'head = [3,2,0,-4], pos = 1', example_output: 'index 1', hints: ['Floyd cycle start'], solution_explanation: 'Floyd: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Remove Nth Node From End', difficulty: 'medium', topic: 'linked_list', pattern: 'fast_slow', patternCategory: 'two_pointer', leetCodeUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list', problem_description: 'Remove nth node from end', constraints: ['1 <= sz <= 30'], example_input: 'head = [1,2,3,4,5], n = 2', example_output: '[1,2,3,5]', hints: ['Fast/slow pointer', 'Dummy node'], solution_explanation: 'Two pointers: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Reorder List', difficulty: 'medium', topic: 'linked_list', pattern: 'll_reorder', patternCategory: 'linked_list', leetCodeUrl: 'https://leetcode.com/problems/reorder-list', problem_description: 'Reorder list L0→Ln→L1→Ln-1...', constraints: ['1 <= nodes <= 5 * 10^4'], example_input: 'head = [1,2,3,4]', example_output: '[1,4,2,3]', hints: ['Find middle', 'Reverse second', 'Merge'], solution_explanation: 'Three steps: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Add Two Numbers', difficulty: 'medium', topic: 'linked_list', pattern: 'll_math', patternCategory: 'linked_list', leetCodeUrl: 'https://leetcode.com/problems/add-two-numbers', problem_description: 'Add two numbers represented as lists', constraints: ['1 <= length <= 100'], example_input: 'l1 = [2,4,3], l2 = [5,6,4]', example_output: '[7,0,8]', hints: ['Simulate addition', 'Track carry'], solution_explanation: 'Simulate: O(max(m,n)) time', time_complexity: 'O(max(m,n))', space_complexity: 'O(max(m,n))', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Copy List with Random Pointer', difficulty: 'medium', topic: 'linked_list', pattern: 'll_clone', patternCategory: 'linked_list', leetCodeUrl: 'https://leetcode.com/problems/copy-list-with-random-pointer', problem_description: 'Deep copy list with random pointer', constraints: ['0 <= n <= 1000'], example_input: 'head = [[7,null],[13,0]]', example_output: '[[7,null],[13,0]]', hints: ['Hash map or interleaving'], solution_explanation: 'Interleaving: O(n) time, O(1) space', time_complexity: 'O(n)', space_complexity: 'O(1)', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Merge k Sorted Lists', difficulty: 'hard', topic: 'linked_list', pattern: 'heap_merge', patternCategory: 'heap', leetCodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists', problem_description: 'Merge k sorted lists', constraints: ['k == lists.length', '0 <= k <= 10^4'], example_input: 'lists = [[1,4,5],[1,3,4],[2,6]]', example_output: '[1,1,2,3,4,4,5,6]', hints: ['Min heap', 'Compare one by one'], solution_explanation: 'Heap: O(n log k) time', time_complexity: 'O(n log k)', space_complexity: 'O(k)', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Reverse Nodes in k-Group', difficulty: 'hard', topic: 'linked_list', pattern: 'll_reverse', patternCategory: 'linked_list', leetCodeUrl: 'https://leetcode.com/problems/reverse-nodes-in-k-group', problem_description: 'Reverse nodes in groups of k', constraints: ['1 <= k <= length <= 5000'], example_input: 'head = [1,2,3,4,5], k = 2', example_output: '[2,1,4,3,5]', hints: ['Reverse k nodes', 'Connect groups'], solution_explanation: 'Recursive: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(k)' })
];

// Tree questions (15)
const treeQuestions: PatternQuestion[] = [
  createQ({ title: 'Maximum Depth of Binary Tree', difficulty: 'easy', topic: 'trees', pattern: 'tree_dfs', patternCategory: 'dfs', leetCodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree', problem_description: 'Find max depth of tree', constraints: ['0 <= nodes <= 10^4'], example_input: 'root = [3,9,20,null,null,15,7]', example_output: '3', hints: ['DFS or BFS'], solution_explanation: 'DFS: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(h)' }),
  createQ({ title: 'Same Tree', difficulty: 'easy', topic: 'trees', pattern: 'tree_dfs', patternCategory: 'dfs', leetCodeUrl: 'https://leetcode.com/problems/same-tree', problem_description: 'Check if two trees are identical', constraints: ['0 <= nodes <= 100'], example_input: 'p = [1,2,3], q = [1,2,3]', example_output: 'true', hints: ['Compare recursively'], solution_explanation: 'DFS: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(h)' }),
  createQ({ title: 'Invert Binary Tree', difficulty: 'easy', topic: 'trees', pattern: 'tree_dfs', patternCategory: 'dfs', leetCodeUrl: 'https://leetcode.com/problems/invert-binary-tree', problem_description: 'Mirror/invert binary tree', constraints: ['0 <= nodes <= 100'], example_input: 'root = [4,2,7,1,3,6,9]', example_output: '[4,7,2,9,6,3,1]', hints: ['Swap children', 'DFS or BFS'], solution_explanation: 'DFS: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(h)', companies: ['Google', 'Facebook'] }),
  createQ({ title: 'Binary Tree Level Order', difficulty: 'medium', topic: 'trees', pattern: 'level_order', patternCategory: 'bfs', leetCodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal', problem_description: 'Level order traversal', constraints: ['0 <= nodes <= 2000'], example_input: 'root = [3,9,20,null,null,15,7]', example_output: '[[3],[9,20],[15,7]]', hints: ['BFS with queue', 'Track level size'], solution_explanation: 'BFS: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(w)' }),
  createQ({ title: 'Binary Tree Zigzag Level Order', difficulty: 'medium', topic: 'trees', pattern: 'level_order', patternCategory: 'bfs', leetCodeUrl: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal', problem_description: 'Zigzag level order traversal', constraints: ['0 <= nodes <= 2000'], example_input: 'root = [3,9,20,null,null,15,7]', example_output: '[[3],[20,9],[15,7]]', hints: ['BFS with flag', 'Reverse alternate levels'], solution_explanation: 'BFS: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(w)' }),
  createQ({ title: 'Validate Binary Search Tree', difficulty: 'medium', topic: 'trees', pattern: 'tree_bst', patternCategory: 'tree', leetCodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree', problem_description: 'Check if valid BST', constraints: ['1 <= nodes <= 10^4'], example_input: 'root = [2,1,3]', example_output: 'true', hints: ['In-order traversal', 'Min/max bounds'], solution_explanation: 'DFS with bounds: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(h)', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Kth Smallest Element in BST', difficulty: 'medium', topic: 'trees', pattern: 'tree_bst', patternCategory: 'tree', leetCodeUrl: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst', problem_description: 'Find kth smallest in BST', constraints: ['1 <= nodes <= 10^4'], example_input: 'root = [3,1,4,null,2], k = 1', example_output: '1', hints: ['In-order traversal', 'Count nodes'], solution_explanation: 'In-order: O(h + k) time', time_complexity: 'O(h+k)', space_complexity: 'O(h)', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Lowest Common Ancestor BST', difficulty: 'medium', topic: 'trees', pattern: 'tree_lca', patternCategory: 'tree', leetCodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree', problem_description: 'Find LCA in BST', constraints: ['2 <= nodes <= 10^5'], example_input: 'root = [6,2,8,0,4,7,9], p = 2, q = 8', example_output: '6', hints: ['Use BST property'], solution_explanation: 'O(h) time', time_complexity: 'O(h)', space_complexity: 'O(1)' }),
  createQ({ title: 'Lowest Common Ancestor BT', difficulty: 'medium', topic: 'trees', pattern: 'tree_lca', patternCategory: 'tree', leetCodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree', problem_description: 'Find LCA in binary tree', constraints: ['2 <= nodes <= 10^5'], example_input: 'root = [3,5,1,6,2,0,8], p = 5, q = 1', example_output: '3', hints: ['Post-order traversal'], solution_explanation: 'DFS: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(h)', companies: ['Facebook', 'Amazon'] }),
  createQ({ title: 'Construct BT from Pre/Inorder', difficulty: 'medium', topic: 'trees', pattern: 'tree_construct', patternCategory: 'tree', leetCodeUrl: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal', problem_description: 'Build tree from traversals', constraints: ['1 <= length <= 3000'], example_input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]', example_output: '[3,9,20,null,null,15,7]', hints: ['Pre-order gives root', 'In-order gives left/right'], solution_explanation: 'Recursive: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Serialize and Deserialize BT', difficulty: 'hard', topic: 'trees', pattern: 'tree_serialize', patternCategory: 'tree', leetCodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree', problem_description: 'Convert tree to string and back', constraints: ['0 <= nodes <= 10^4'], example_input: 'root = [1,2,3,null,null,4,5]', example_output: '[1,2,3,null,null,4,5]', hints: ['Pre-order with null markers'], solution_explanation: 'Pre-order: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(n)', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Binary Tree Maximum Path Sum', difficulty: 'hard', topic: 'trees', pattern: 'tree_dfs', patternCategory: 'dfs', leetCodeUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum', problem_description: 'Find max path sum in tree', constraints: ['1 <= nodes <= 3 * 10^4'], example_input: 'root = [1,2,3]', example_output: '6', hints: ['Post-order', 'Track max path through node'], solution_explanation: 'Post-order: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(h)', companies: ['Facebook', 'Amazon'] }),
  createQ({ title: 'Diameter of Binary Tree', difficulty: 'easy', topic: 'trees', pattern: 'tree_diameter', patternCategory: 'tree', leetCodeUrl: 'https://leetcode.com/problems/diameter-of-binary-tree', problem_description: 'Find diameter of tree', constraints: ['1 <= nodes <= 10^4'], example_input: 'root = [1,2,3,4,5]', example_output: '3', hints: ['Height calculation', 'Track max'], solution_explanation: 'Post-order: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(h)' }),
  createQ({ title: 'Binary Tree Right Side View', difficulty: 'medium', topic: 'trees', pattern: 'level_order', patternCategory: 'bfs', leetCodeUrl: 'https://leetcode.com/problems/binary-tree-right-side-view', problem_description: 'View from right side', constraints: ['0 <= nodes <= 100'], example_input: 'root = [1,2,3,null,5,null,4]', example_output: '[1,3,4]', hints: ['BFS last element', 'DFS right first'], solution_explanation: 'BFS: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(w)' }),
  createQ({ title: 'Populating Next Right Pointers', difficulty: 'medium', topic: 'trees', pattern: 'level_order', patternCategory: 'bfs', leetCodeUrl: 'https://leetcode.com/problems/populating-next-right-pointers-in-each-node', problem_description: 'Connect nodes at same level', constraints: ['0 <= nodes <= 4096'], example_input: 'root = [1,2,3,4,5,6,7]', example_output: '[1,#,2,3,#,4,5,6,7,#]', hints: ['Level by level', 'Connect children'], solution_explanation: 'BFS: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)' })
];

// DP questions (20)
const dpQuestions: PatternQuestion[] = [
  createQ({ title: 'Climbing Stairs', difficulty: 'easy', topic: 'dp', pattern: 'dp_1d', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/climbing-stairs', problem_description: 'Count ways to climb n stairs', constraints: ['1 <= n <= 45'], example_input: 'n = 3', example_output: '3', hints: ['Fibonacci', 'dp[i] = dp[i-1] + dp[i-2]'], solution_explanation: 'DP: O(n) time, O(1) space', time_complexity: 'O(n)', space_complexity: 'O(1)' }),
  createQ({ title: 'House Robber', difficulty: 'medium', topic: 'dp', pattern: 'dp_1d', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/house-robber', problem_description: 'Max money without robbing adjacent', constraints: ['1 <= nums.length <= 100'], example_input: 'nums = [1,2,3,1]', example_output: '4', hints: ['dp[i] = max(dp[i-1], dp[i-2] + nums[i])'], solution_explanation: 'DP: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)' }),
  createQ({ title: 'House Robber II', difficulty: 'medium', topic: 'dp', pattern: 'dp_1d', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/house-robber-ii', problem_description: 'House robber with circular houses', constraints: ['1 <= nums.length <= 100'], example_input: 'nums = [2,3,2]', example_output: '3', hints: ['Two cases: with/without first house'], solution_explanation: 'Two DP runs: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Longest Increasing Subsequence', difficulty: 'medium', topic: 'dp', pattern: 'dp_lis', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/longest-increasing-subsequence', problem_description: 'Find LIS length', constraints: ['1 <= nums.length <= 2500'], example_input: 'nums = [10,9,2,5,3,7,101,18]', example_output: '4', hints: ['dp[i] = LIS ending at i', 'Binary search optimization'], solution_explanation: 'DP or BS: O(n log n) time', time_complexity: 'O(n log n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Maximum Product Subarray', difficulty: 'medium', topic: 'dp', pattern: 'dp_1d', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/maximum-product-subarray', problem_description: 'Max product subarray', constraints: ['1 <= nums.length <= 2 * 10^4'], example_input: 'nums = [2,3,-2,4]', example_output: '6', hints: ['Track max and min'], solution_explanation: 'DP: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Coin Change', difficulty: 'medium', topic: 'dp', pattern: 'dp_knapsack', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/coin-change', problem_description: 'Min coins to make amount', constraints: ['1 <= coins.length <= 12'], example_input: 'coins = [1,2,5], amount = 11', example_output: '3', hints: ['Unbounded knapsack', 'dp[i] = min coins for i'], solution_explanation: 'DP: O(amount * n) time', time_complexity: 'O(amount * n)', space_complexity: 'O(amount)', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Coin Change II', difficulty: 'medium', topic: 'dp', pattern: 'dp_knapsack', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/coin-change-2', problem_description: 'Number of ways to make amount', constraints: ['1 <= coins.length <= 300'], example_input: 'coins = [1,2,5], amount = 5', example_output: '4', hints: ['Unbounded knapsack count'], solution_explanation: 'DP: O(amount * n) time', time_complexity: 'O(amount * n)', space_complexity: 'O(amount)' }),
  createQ({ title: 'Word Break', difficulty: 'medium', topic: 'dp', pattern: 'dp_1d', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/word-break', problem_description: 'Can string be segmented', constraints: ['1 <= s.length <= 300'], example_input: 's = "leetcode", wordDict = ["leet","code"]', example_output: 'true', hints: ['DP with substring check'], solution_explanation: 'DP: O(n²) time', time_complexity: 'O(n²)', space_complexity: 'O(n)', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Unique Paths', difficulty: 'medium', topic: 'dp', pattern: 'dp_2d', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/unique-paths', problem_description: 'Count unique paths in grid', constraints: ['1 <= m, n <= 100'], example_input: 'm = 3, n = 7', example_output: '28', hints: ['dp[i][j] = dp[i-1][j] + dp[i][j-1]'], solution_explanation: 'DP: O(m*n) time', time_complexity: 'O(m*n)', space_complexity: 'O(min(m,n))' }),
  createQ({ title: 'Unique Paths II', difficulty: 'medium', topic: 'dp', pattern: 'dp_2d', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/unique-paths-ii', problem_description: 'Unique paths with obstacles', constraints: ['m == obstacleGrid.length'], example_input: 'obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]', example_output: '2', hints: ['Handle obstacles'], solution_explanation: 'DP: O(m*n) time', time_complexity: 'O(m*n)', space_complexity: 'O(min(m,n))' }),
  createQ({ title: 'Longest Common Subsequence', difficulty: 'medium', topic: 'dp', pattern: 'dp_2d', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/longest-common-subsequence', problem_description: 'Find LCS length', constraints: ['1 <= text1.length, text2.length <= 1000'], example_input: 'text1 = "abcde", text2 = "ace"', example_output: '3', hints: ['dp[i][j] based on match'], solution_explanation: 'DP: O(m*n) time', time_complexity: 'O(m*n)', space_complexity: 'O(min(m,n))' }),
  createQ({ title: 'Edit Distance', difficulty: 'hard', topic: 'dp', pattern: 'dp_2d', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/edit-distance', problem_description: 'Min operations to convert word1 to word2', constraints: ['0 <= word1.length, word2.length <= 500'], example_input: 'word1 = "horse", word2 = "ros"', example_output: '3', hints: ['2D DP table'], solution_explanation: 'DP: O(m*n) time', time_complexity: 'O(m*n)', space_complexity: 'O(min(m,n))', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Maximum Subarray Sum with One Deletion', difficulty: 'medium', topic: 'dp', pattern: 'dp_1d', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion', problem_description: 'Max sum with at most one deletion', constraints: ['1 <= arr.length <= 10^5'], example_input: 'arr = [1,-2,0,3]', example_output: '4', hints: ['Track with/without deletion'], solution_explanation: 'DP: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Partition Equal Subset Sum', difficulty: 'medium', topic: 'dp', pattern: 'dp_knapsack', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/partition-equal-subset-sum', problem_description: 'Can array be partitioned into two equal subsets', constraints: ['1 <= nums.length <= 200'], example_input: 'nums = [1,5,11,5]', example_output: 'true', hints: ['Subset sum problem'], solution_explanation: 'DP: O(n*sum) time', time_complexity: 'O(n*sum)', space_complexity: 'O(sum)' }),
  createQ({ title: 'Target Sum', difficulty: 'medium', topic: 'dp', pattern: 'dp_knapsack', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/target-sum', problem_description: 'Ways to assign + or - to get target', constraints: ['1 <= nums.length <= 20'], example_input: 'nums = [1,1,1,1,1], target = 3', example_output: '5', hints: ['Transform to subset sum'], solution_explanation: 'DP: O(n*sum) time', time_complexity: 'O(n*sum)', space_complexity: 'O(sum)' }),
  createQ({ title: 'Best Time to Buy/Sell Stock III', difficulty: 'hard', topic: 'dp', pattern: 'dp_state_machine', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii', problem_description: 'Max profit with at most 2 transactions', constraints: ['1 <= prices.length <= 10^5'], example_input: 'prices = [3,3,5,0,0,3,1,4]', example_output: '6', hints: ['4 states: hold1, sold1, hold2, sold2'], solution_explanation: 'State machine: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Best Time to Buy/Sell Stock IV', difficulty: 'hard', topic: 'dp', pattern: 'dp_state_machine', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv', problem_description: 'Max profit with at most k transactions', constraints: ['0 <= k <= 100'], example_input: 'k = 2, prices = [2,4,1]', example_output: '2', hints: ['DP with k transactions'], solution_explanation: 'DP: O(n*k) time', time_complexity: 'O(n*k)', space_complexity: 'O(k)' }),
  createQ({ title: 'Regular Expression Matching', difficulty: 'hard', topic: 'dp', pattern: 'dp_2d', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/regular-expression-matching', problem_description: 'Implement regex with . and *', constraints: ['1 <= s.length <= 20'], example_input: 's = "aa", p = "a*"', example_output: 'true', hints: ['2D DP table'], solution_explanation: 'DP: O(m*n) time', time_complexity: 'O(m*n)', space_complexity: 'O(m*n)', companies: ['Facebook', 'Google'] }),
  createQ({ title: 'Wildcards Matching', difficulty: 'hard', topic: 'dp', pattern: 'dp_2d', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/wildcard-matching', problem_description: 'Match with ? and *', constraints: ['0 <= s.length, p.length <= 2000'], example_input: 's = "aa", p = "*"', example_output: 'true', hints: ['2D DP with greedy optimization'], solution_explanation: 'DP: O(m*n) time', time_complexity: 'O(m*n)', space_complexity: 'O(m*n)' }),
  createQ({ title: 'Interleaving String', difficulty: 'medium', topic: 'dp', pattern: 'dp_2d', patternCategory: 'dp', leetCodeUrl: 'https://leetcode.com/problems/interleaving-string', problem_description: 'Check if s3 is interleaving of s1 and s2', constraints: ['0 <= s1.length, s2.length <= 100'], example_input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"', example_output: 'true', hints: ['2D DP matching chars'], solution_explanation: 'DP: O(m*n) time', time_complexity: 'O(m*n)', space_complexity: 'O(m*n)' })
];

// BFS/DFS/Graph questions (20)
const graphQuestions: PatternQuestion[] = [
  createQ({ title: 'Number of Islands', difficulty: 'medium', topic: 'graphs', pattern: 'island_count', patternCategory: 'bfs', leetCodeUrl: 'https://leetcode.com/problems/number-of-islands', problem_description: 'Count islands in grid', constraints: ['m == grid.length'], example_input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"]]', example_output: '1', hints: ['BFS/DFS', 'Mark visited'], solution_explanation: 'BFS: O(m*n) time', time_complexity: 'O(m*n)', space_complexity: 'O(min(m,n))', companies: ['Amazon', 'Microsoft'] }),
  createQ({ title: 'Clone Graph', difficulty: 'medium', topic: 'graphs', pattern: 'clone_graph', patternCategory: 'dfs', leetCodeUrl: 'https://leetcode.com/problems/clone-graph', problem_description: 'Deep copy of graph', constraints: ['0 <= nodes <= 100'], example_input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', example_output: '[[2,4],[1,3],[2,4],[1,3]]', hints: ['Hash map', 'DFS/BFS'], solution_explanation: 'DFS: O(n+e) time', time_complexity: 'O(n+e)', space_complexity: 'O(n)' }),
  createQ({ title: 'Course Schedule', difficulty: 'medium', topic: 'graphs', pattern: 'topological_sort', patternCategory: 'dfs', leetCodeUrl: 'https://leetcode.com/problems/course-schedule', problem_description: 'Can finish all courses', constraints: ['1 <= numCourses <= 2000'], example_input: 'numCourses = 2, prerequisites = [[1,0]]', example_output: 'true', hints: ['Cycle detection', 'Topological sort'], solution_explanation: 'DFS cycle detection: O(n+e) time', time_complexity: 'O(n+e)', space_complexity: 'O(n+e)', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Course Schedule II', difficulty: 'medium', topic: 'graphs', pattern: 'topological_sort', patternCategory: 'dfs', leetCodeUrl: 'https://leetcode.com/problems/course-schedule-ii', problem_description: 'Return valid order of courses', constraints: ['1 <= numCourses <= 2000'], example_input: 'numCourses = 2, prerequisites = [[1,0]]', example_output: '[0,1]', hints: ['Topological sort'], solution_explanation: 'Kahn or DFS: O(n+e) time', time_complexity: 'O(n+e)', space_complexity: 'O(n+e)' }),
  createQ({ title: 'Pacific Atlantic Water Flow', difficulty: 'medium', topic: 'graphs', pattern: 'island_count', patternCategory: 'dfs', leetCodeUrl: 'https://leetcode.com/problems/pacific-atlantic-water-flow', problem_description: 'Cells that flow to both oceans', constraints: ['m == heights.length'], example_input: 'heights = [[1,2,2,3,5],[3,2,3,4,4]]', example_output: '[[0,4],[1,3],[1,4]]', hints: ['Reverse flow from oceans'], solution_explanation: 'DFS from borders: O(m*n) time', time_complexity: 'O(m*n)', space_complexity: 'O(m*n)' }),
  createQ({ title: 'Rotting Oranges', difficulty: 'medium', topic: 'graphs', pattern: 'shortest_path', patternCategory: 'bfs', leetCodeUrl: 'https://leetcode.com/problems/rotting-oranges', problem_description: 'Time until no fresh oranges', constraints: ['m == grid.length'], example_input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', example_output: '4', hints: ['BFS from rotten oranges'], solution_explanation: 'Multi-source BFS: O(m*n) time', time_complexity: 'O(m*n)', space_complexity: 'O(m*n)' }),
  createQ({ title: 'Word Ladder', difficulty: 'hard', topic: 'graphs', pattern: 'word_ladder', patternCategory: 'bfs', leetCodeUrl: 'https://leetcode.com/problems/word-ladder', problem_description: 'Shortest transformation sequence', constraints: ['1 <= beginWord.length <= 10'], example_input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', example_output: '5', hints: ['BFS', 'Pattern matching'], solution_explanation: 'BFS: O(n*wordLength²) time', time_complexity: 'O(n*L²)', space_complexity: 'O(n*L)', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Word Ladder II', difficulty: 'hard', topic: 'graphs', pattern: 'word_ladder', patternCategory: 'bfs', leetCodeUrl: 'https://leetcode.com/problems/word-ladder-ii', problem_description: 'All shortest transformation sequences', constraints: ['1 <= beginWord.length <= 5'], example_input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', example_output: '[["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]', hints: ['BFS + Backtracking'], solution_explanation: 'BFS then DFS: O(n*L*26) time', time_complexity: 'O(n*L*26)', space_complexity: 'O(n*L)' }),
  createQ({ title: 'Surrounded Regions', difficulty: 'medium', topic: 'graphs', pattern: 'island_count', patternCategory: 'dfs', leetCodeUrl: 'https://leetcode.com/problems/surrounded-regions', problem_description: 'Capture surrounded regions', constraints: ['m == board.length'], example_input: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]', example_output: 'X-filled board', hints: ['DFS from borders', 'Flip O\'s not connected to border'], solution_explanation: 'DFS: O(m*n) time', time_complexity: 'O(m*n)', space_complexity: 'O(m*n)' }),
  createQ({ title: 'Max Area of Island', difficulty: 'medium', topic: 'graphs', pattern: 'island_count', patternCategory: 'dfs', leetCodeUrl: 'https://leetcode.com/problems/max-area-of-island', problem_description: 'Maximum area of island', constraints: ['m == grid.length'], example_input: 'grid = [[0,0,1,0,0],[0,0,1,0,0]]', example_output: '2', hints: ['DFS and count cells'], solution_explanation: 'DFS: O(m*n) time', time_complexity: 'O(m*n)', space_complexity: 'O(m*n)' }),
  createQ({ title: 'Shortest Path in Binary Matrix', difficulty: 'medium', topic: 'graphs', pattern: 'shortest_path', patternCategory: 'bfs', leetCodeUrl: 'https://leetcode.com/problems/shortest-path-in-binary-matrix', problem_description: 'Shortest clear path from top-left to bottom-right', constraints: ['n == grid.length'], example_input: 'grid = [[0,1],[1,0]]', example_output: '2', hints: ['BFS', '8 directions'], solution_explanation: 'BFS: O(n²) time', time_complexity: 'O(n²)', space_complexity: 'O(n²)' }),
  createQ({ title: 'Snakes and Ladders', difficulty: 'medium', topic: 'graphs', pattern: 'shortest_path', patternCategory: 'bfs', leetCodeUrl: 'https://leetcode.com/problems/snakes-and-ladders', problem_description: 'Least moves to reach end', constraints: ['n == board.length'], example_input: 'board = [[-1,-1,-1,-1],[-1,-1,-1,-1]]', example_output: '1', hints: ['BFS on board'], solution_explanation: 'BFS: O(n²) time', time_complexity: 'O(n²)', space_complexity: 'O(n²)' }),
  createQ({ title: 'As Far from Land as Possible', difficulty: 'medium', topic: 'graphs', pattern: 'shortest_path', patternCategory: 'bfs', leetCodeUrl: 'https://leetcode.com/problems/as-far-from-land-as-possible', problem_description: 'Max distance to nearest land', constraints: ['n == grid.length'], example_input: 'grid = [[1,0,1],[0,0,0],[1,0,1]]', example_output: '2', hints: ['Multi-source BFS from land'], solution_explanation: 'BFS: O(n²) time', time_complexity: 'O(n²)', space_complexity: 'O(n²)' }),
  createQ({ title: 'Number of Provinces', difficulty: 'medium', topic: 'graphs', pattern: 'clone_graph', patternCategory: 'dfs', leetCodeUrl: 'https://leetcode.com/problems/number-of-provinces', problem_description: 'Count connected components', constraints: ['1 <= n <= 200'], example_input: 'isConnected = [[1,1,0],[1,1,0],[0,0,1]]', example_output: '2', hints: ['Union find or DFS'], solution_explanation: 'DFS: O(n²) time', time_complexity: 'O(n²)', space_complexity: 'O(n)' }),
  createQ({ title: 'Redundant Connection', difficulty: 'medium', topic: 'graphs', pattern: 'clone_graph', patternCategory: 'dfs', leetCodeUrl: 'https://leetcode.com/problems/redundant-connection', problem_description: 'Find edge that creates cycle', constraints: ['n == edges.length'], example_input: 'edges = [[1,2],[1,3],[2,3]]', example_output: '[2,3]', hints: ['Union find'], solution_explanation: 'Union find: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Accounts Merge', difficulty: 'medium', topic: 'graphs', pattern: 'clone_graph', patternCategory: 'dfs', leetCodeUrl: 'https://leetcode.com/problems/accounts-merge', problem_description: 'Merge accounts with same email', constraints: ['1 <= accounts.length <= 1000'], example_input: 'accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"]]', example_output: '[["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"]]', hints: ['Union find on emails'], solution_explanation: 'Union find: O(n²) time', time_complexity: 'O(n²)', space_complexity: 'O(n)' }),
  createQ({ title: 'Minimum Height Trees', difficulty: 'medium', topic: 'graphs', pattern: 'topological_sort', patternCategory: 'bfs', leetCodeUrl: 'https://leetcode.com/problems/minimum-height-trees', problem_description: 'Roots of minimum height trees', constraints: ['1 <= n <= 2 * 10^4'], example_input: 'n = 4, edges = [[1,0],[1,2],[1,3]]', example_output: '[1]', hints: ['Remove leaves level by level'], solution_explanation: 'Topological sort: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Alien Dictionary', difficulty: 'hard', topic: 'graphs', pattern: 'topological_sort', patternCategory: 'dfs', leetCodeUrl: 'https://leetcode.com/problems/alien-dictionary', problem_description: 'Derive letter order from sorted words', constraints: ['1 <= words.length <= 100'], example_input: 'words = ["wrt","wrf","er","ett","rftt"]', example_output: '"wertf"', hints: ['Build graph from order', 'Topological sort'], solution_explanation: 'Topo sort: O(C) time where C is total chars', time_complexity: 'O(C)', space_complexity: 'O(U) where U=unique letters', companies: ['Facebook', 'Amazon'] }),
  createQ({ title: 'Sequence Reconstruction', difficulty: 'medium', topic: 'graphs', pattern: 'topological_sort', patternCategory: 'bfs', leetCodeUrl: 'https://leetcode.com/problems/sequence-reconstruction', problem_description: 'Check if org is unique sequence', constraints: ['1 <= n <= 10^4'], example_input: 'org = [1,2,3], seqs = [[1,2],[1,3],[2,3]]', example_output: 'false', hints: ['Topological sort', 'Check uniqueness'], solution_explanation: 'Topo sort: O(V+E) time', time_complexity: 'O(V+E)', space_complexity: 'O(V+E)' }),
  createQ({ title: 'All Paths from Source to Target', difficulty: 'medium', topic: 'graphs', pattern: 'graph_dfs', patternCategory: 'dfs', leetCodeUrl: 'https://leetcode.com/problems/all-paths-from-source-to-target', problem_description: 'All paths in DAG from 0 to n-1', constraints: ['n == graph.length', '2 <= n <= 15'], example_input: 'graph = [[1,2],[3],[3],[]]', example_output: '[[0,1,3],[0,2,3]]', hints: ['DFS with backtracking'], solution_explanation: 'DFS: O(2^n) time', time_complexity: 'O(2^n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Critical Connections in a Network', difficulty: 'hard', topic: 'graphs', pattern: 'graph_dfs', patternCategory: 'dfs', leetCodeUrl: 'https://leetcode.com/problems/critical-connections-in-a-network', problem_description: 'Find bridges in graph', constraints: ['2 <= n <= 10^5'], example_input: 'n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]', example_output: '[[1,3]]', hints: ['Tarjan\'s algorithm', 'Discovery and low times'], solution_explanation: 'Tarjan: O(V+E) time', time_complexity: 'O(V+E)', space_complexity: 'O(V)' })
];

// Heap questions (10)
const heapQuestions: PatternQuestion[] = [
  createQ({ title: 'Kth Largest Element', difficulty: 'medium', topic: 'heap', pattern: 'heap_top_k', patternCategory: 'heap', leetCodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array', problem_description: 'Find kth largest element', constraints: ['1 <= k <= nums.length <= 10^5'], example_input: 'nums = [3,2,1,5,6,4], k = 2', example_output: '5', hints: ['Min heap of size k', 'Or quickselect'], solution_explanation: 'Min heap: O(n log k) time', time_complexity: 'O(n log k)', space_complexity: 'O(k)', companies: ['Facebook', 'Amazon'] }),
  createQ({ title: 'Top K Frequent Elements', difficulty: 'medium', topic: 'heap', pattern: 'heap_top_k', patternCategory: 'heap', leetCodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements', problem_description: 'K most frequent elements', constraints: ['1 <= nums.length <= 10^5'], example_input: 'nums = [1,1,1,2,2,3], k = 2', example_output: '[1,2]', hints: ['Hash map + heap', 'Bucket sort'], solution_explanation: 'Heap: O(n log k) time', time_complexity: 'O(n log k)', space_complexity: 'O(n+k)', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Find Median from Data Stream', difficulty: 'hard', topic: 'heap', pattern: 'heap_median', patternCategory: 'heap', leetCodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream', problem_description: 'Find median in stream', constraints: ['-10^5 <= num <= 10^5'], example_input: 'addNum(1), addNum(2), findMedian()', example_output: '1.5', hints: ['Two heaps: max for lower, min for upper'], solution_explanation: 'Two heaps: O(log n) per op', time_complexity: 'O(log n)', space_complexity: 'O(n)', companies: ['Amazon', 'Microsoft'] }),
  createQ({ title: 'Sliding Window Maximum', difficulty: 'hard', topic: 'heap', pattern: 'heap_top_k', patternCategory: 'heap', leetCodeUrl: 'https://leetcode.com/problems/sliding-window-maximum', problem_description: 'Max in each sliding window', constraints: ['1 <= nums.length <= 10^5'], example_input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', example_output: '[3,3,5,5,6,7]', hints: ['Deque approach', 'Monotonic queue'], solution_explanation: 'Monotonic deque: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(k)', companies: ['Amazon', 'Google'] }),
  createQ({ title: 'K Closest Points to Origin', difficulty: 'medium', topic: 'heap', pattern: 'heap_top_k', patternCategory: 'heap', leetCodeUrl: 'https://leetcode.com/problems/k-closest-points-to-origin', problem_description: 'K closest points to (0,0)', constraints: ['1 <= k <= points.length <= 10^4'], example_input: 'points = [[1,3],[-2,2]], k = 1', example_output: '[[-2,2]]', hints: ['Max heap of size k'], solution_explanation: 'Heap: O(n log k) time', time_complexity: 'O(n log k)', space_complexity: 'O(k)' }),
  createQ({ title: 'Reorganize String', difficulty: 'medium', topic: 'heap', pattern: 'heap_top_k', patternCategory: 'heap', leetCodeUrl: 'https://leetcode.com/problems/reorganize-string', problem_description: 'Reorganize so no adjacent same', constraints: ['1 <= s.length <= 500'], example_input: 's = "aab"', example_output: '"aba"', hints: ['Max heap by frequency', 'Place most frequent first'], solution_explanation: 'Heap: O(n log k) time', time_complexity: 'O(n log k)', space_complexity: 'O(k)' }),
  createQ({ title: 'Task Scheduler', difficulty: 'medium', topic: 'heap', pattern: 'heap_top_k', patternCategory: 'heap', leetCodeUrl: 'https://leetcode.com/problems/task-scheduler', problem_description: 'Least intervals to complete tasks with cooling', constraints: ['1 <= tasks.length <= 10^4'], example_input: 'tasks = ["A","A","A","B","B","B"], n = 2', example_output: '8', hints: ['Max heap for task counts', 'Wait for cooling'], solution_explanation: 'Heap: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)', companies: ['Facebook', 'Amazon'] }),
  createQ({ title: 'Design Twitter', difficulty: 'medium', topic: 'heap', pattern: 'design', patternCategory: 'design', leetCodeUrl: 'https://leetcode.com/problems/design-twitter', problem_description: 'Design simplified Twitter', constraints: ['1 <= userId <= 500'], example_input: 'postTweet(1,5),getNewsFeed(1)', example_output: '[5]', hints: ['Merge k sorted lists', 'Max heap'], solution_explanation: 'Heap: O(k log f) time', time_complexity: 'O(k log f)', space_complexity: 'O(k+f)', companies: ['Amazon'] }),
  createQ({ title: 'Ugly Number II', difficulty: 'medium', topic: 'heap', pattern: 'heap_top_k', patternCategory: 'heap', leetCodeUrl: 'https://leetcode.com/problems/ugly-number-ii', problem_description: 'Nth ugly number', constraints: ['1 <= n <= 1690'], example_input: 'n = 10', example_output: '12', hints: ['Min heap', 'Or three pointers'], solution_explanation: 'Three pointers: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Sort Characters By Frequency', difficulty: 'medium', topic: 'heap', pattern: 'heap_top_k', patternCategory: 'heap', leetCodeUrl: 'https://leetcode.com/problems/sort-characters-by-frequency', problem_description: 'Sort string by decreasing frequency', constraints: ['1 <= s.length <= 5 * 10^5'], example_input: 's = "tree"', example_output: '"eert"', hints: ['Count then sort', 'Or bucket sort'], solution_explanation: 'Bucket sort: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(n)' })
];

// Backtracking questions (15)
const backtrackingQuestions: PatternQuestion[] = [
  createQ({ title: 'Subsets', difficulty: 'medium', topic: 'backtracking', pattern: 'bt_subsets', patternCategory: 'backtracking', leetCodeUrl: 'https://leetcode.com/problems/subsets', problem_description: 'All subsets of array', constraints: ['1 <= nums.length <= 10'], example_input: 'nums = [1,2,3]', example_output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]', hints: ['Backtrack', 'Include/exclude'], solution_explanation: 'Backtracking: O(n * 2^n) time', time_complexity: 'O(n * 2^n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Subsets II', difficulty: 'medium', topic: 'backtracking', pattern: 'bt_subsets', patternCategory: 'backtracking', leetCodeUrl: 'https://leetcode.com/problems/subsets-ii', problem_description: 'All subsets with duplicates', constraints: ['1 <= nums.length <= 10'], example_input: 'nums = [1,2,2]', example_output: '[[],[1],[1,2],[1,2,2],[2],[2,2]]', hints: ['Sort first', 'Skip duplicates'], solution_explanation: 'Backtracking: O(n * 2^n) time', time_complexity: 'O(n * 2^n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Combinations', difficulty: 'medium', topic: 'backtracking', pattern: 'bt_combination', patternCategory: 'backtracking', leetCodeUrl: 'https://leetcode.com/problems/combinations', problem_description: 'All k combinations of 1..n', constraints: ['1 <= n <= 20'], example_input: 'n = 4, k = 2', example_output: '[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]', hints: ['Backtrack with start index'], solution_explanation: 'Backtracking: O(C(n,k)) time', time_complexity: 'O(C(n,k))', space_complexity: 'O(k)' }),
  createQ({ title: 'Combination Sum', difficulty: 'medium', topic: 'backtracking', pattern: 'bt_combination', patternCategory: 'backtracking', leetCodeUrl: 'https://leetcode.com/problems/combination-sum', problem_description: 'Combinations that sum to target', constraints: ['1 <= candidates.length <= 30'], example_input: 'candidates = [2,3,6,7], target = 7', example_output: '[[2,2,3],[7]]', hints: ['Backtrack', 'Reuse elements'], solution_explanation: 'Backtracking: O(target * 2^target) time', time_complexity: 'O(target^min)', space_complexity: 'O(target)' }),
  createQ({ title: 'Combination Sum II', difficulty: 'medium', topic: 'backtracking', pattern: 'bt_combination', patternCategory: 'backtracking', leetCodeUrl: 'https://leetcode.com/problems/combination-sum-ii', problem_description: 'Combinations that sum to target (no reuse)', constraints: ['1 <= candidates.length <= 100'], example_input: 'candidates = [10,1,2,7,6,1,5], target = 8', example_output: '[[1,1,6],[1,2,5],[1,7],[2,6]]', hints: ['Sort', 'Skip duplicates'], solution_explanation: 'Backtracking: O(2^n) time', time_complexity: 'O(2^n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Combination Sum III', difficulty: 'medium', topic: 'backtracking', pattern: 'bt_combination', patternCategory: 'backtracking', leetCodeUrl: 'https://leetcode.com/problems/combination-sum-iii', problem_description: 'k numbers that sum to n using 1-9', constraints: ['2 <= k <= 9'], example_input: 'k = 3, n = 7', example_output: '[[1,2,4]]', hints: ['Backtrack 1-9'], solution_explanation: 'Backtracking: O(C(9,k)) time', time_complexity: 'O(C(9,k))', space_complexity: 'O(k)' }),
  createQ({ title: 'Permutations', difficulty: 'medium', topic: 'backtracking', pattern: 'bt_permutation', patternCategory: 'backtracking', leetCodeUrl: 'https://leetcode.com/problems/permutations', problem_description: 'All permutations', constraints: ['1 <= nums.length <= 6'], example_input: 'nums = [1,2,3]', example_output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]', hints: ['Swap approach', 'Used array'], solution_explanation: 'Backtracking: O(n!) time', time_complexity: 'O(n!)', space_complexity: 'O(n)', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Permutations II', difficulty: 'medium', topic: 'backtracking', pattern: 'bt_permutation', patternCategory: 'backtracking', leetCodeUrl: 'https://leetcode.com/problems/permutations-ii', problem_description: 'All unique permutations', constraints: ['1 <= nums.length <= 8'], example_input: 'nums = [1,1,2]', example_output: '[[1,1,2],[1,2,1],[2,1,1]]', hints: ['Sort first', 'Skip used duplicates'], solution_explanation: 'Backtracking: O(n!) time', time_complexity: 'O(n!)', space_complexity: 'O(n)' }),
  createQ({ title: 'Next Permutation', difficulty: 'medium', topic: 'backtracking', pattern: 'bt_permutation', patternCategory: 'backtracking', leetCodeUrl: 'https://leetcode.com/problems/next-permutation', problem_description: 'Next lexicographical permutation', constraints: ['1 <= nums.length <= 100'], example_input: 'nums = [1,2,3]', example_output: '[1,3,2]', hints: ['Find pivot', 'Find successor', 'Reverse suffix'], solution_explanation: 'In-place: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(1)' }),
  createQ({ title: 'N-Queens', difficulty: 'hard', topic: 'backtracking', pattern: 'bt_n_queen', patternCategory: 'backtracking', leetCodeUrl: 'https://leetcode.com/problems/n-queens', problem_description: 'All solutions to n-queens', constraints: ['1 <= n <= 9'], example_input: 'n = 4', example_output: '[[".Q..","...Q","Q...","..Q."]]', hints: ['Row by row', 'Check diagonals'], solution_explanation: 'Backtracking: O(n!) time', time_complexity: 'O(n!)', space_complexity: 'O(n)', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'N-Queens II', difficulty: 'hard', topic: 'backtracking', pattern: 'bt_n_queen', patternCategory: 'backtracking', leetCodeUrl: 'https://leetcode.com/problems/n-queens-ii', problem_description: 'Count solutions to n-queens', constraints: ['1 <= n <= 9'], example_input: 'n = 4', example_output: '2', hints: ['Same as N-Queens but count'], solution_explanation: 'Backtracking: O(n!) time', time_complexity: 'O(n!)', space_complexity: 'O(n)' }),
  createQ({ title: 'Sudoku Solver', difficulty: 'hard', topic: 'backtracking', pattern: 'bt_n_queen', patternCategory: 'backtracking', leetCodeUrl: 'https://leetcode.com/problems/sudoku-solver', problem_description: 'Solve Sudoku puzzle', constraints: ['board.length == 9'], example_input: 'Partial board', example_output: 'Solved board', hints: ['Backtrack empty cells', 'Check validity'], solution_explanation: 'Backtracking: O(9^(n*n)) time', time_complexity: 'O(9^m)', space_complexity: 'O(1)' }),
  createQ({ title: 'Palindrome Partitioning', difficulty: 'medium', topic: 'backtracking', pattern: 'bt_combination', patternCategory: 'backtracking', leetCodeUrl: 'https://leetcode.com/problems/palindrome-partitioning', problem_description: 'All palindrome partitions', constraints: ['1 <= s.length <= 16'], example_input: 's = "aab"', example_output: '[["a","a","b"],["aa","b"]]', hints: ['Backtrack', 'Check palindrome'], solution_explanation: 'Backtracking: O(n * 2^n) time', time_complexity: 'O(n * 2^n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Restore IP Addresses', difficulty: 'medium', topic: 'backtracking', pattern: 'bt_combination', patternCategory: 'backtracking', leetCodeUrl: 'https://leetcode.com/problems/restore-ip-addresses', problem_description: 'All valid IP addresses from string', constraints: ['1 <= s.length <= 20'], example_input: 's = "25525511135"', example_output: '["255.255.11.135","255.255.111.35"]', hints: ['Backtrack 4 segments', 'Valid range 0-255'], solution_explanation: 'Backtracking: O(3^4) time', time_complexity: 'O(3^4)', space_complexity: 'O(1)' }),
  createQ({ title: 'Expression Add Operators', difficulty: 'hard', topic: 'backtracking', pattern: 'bt_combination', patternCategory: 'backtracking', leetCodeUrl: 'https://leetcode.com/problems/expression-add-operators', problem_description: 'Add operators to get target value', constraints: ['1 <= num.length <= 10'], example_input: 'num = "123", target = 6', example_output: '["1+2+3","1*2*3"]', hints: ['Backtrack', 'Track eval and mult'], solution_explanation: 'Backtracking: O(4^n) time', time_complexity: 'O(4^n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Partition to K Equal Sum Subsets', difficulty: 'medium', topic: 'backtracking', pattern: 'bt_combination', patternCategory: 'backtracking', leetCodeUrl: 'https://leetcode.com/problems/partition-to-k-equal-sum-subsets', problem_description: 'Can partition into k subsets with equal sum', constraints: ['1 <= k <= nums.length <= 16'], example_input: 'nums = [4,3,2,3,5,2,1], k = 4', example_output: 'true', hints: ['Backtrack with used array', 'Sort descending'], solution_explanation: 'Backtracking: O(k * 2^n) time', time_complexity: 'O(k * 2^n)', space_complexity: 'O(n)' })
];

// Interval questions (10)
const intervalQuestions: PatternQuestion[] = [
  createQ({ title: 'Merge Intervals', difficulty: 'medium', topic: 'intervals', pattern: 'interval_merge', patternCategory: 'intervals', leetCodeUrl: 'https://leetcode.com/problems/merge-intervals', problem_description: 'Merge overlapping intervals', constraints: ['1 <= intervals.length <= 10^4'], example_input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', example_output: '[[1,6],[8,10],[15,18]]', hints: ['Sort by start', 'Compare and merge'], solution_explanation: 'Sort + merge: O(n log n) time', time_complexity: 'O(n log n)', space_complexity: 'O(n)', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Insert Interval', difficulty: 'medium', topic: 'intervals', pattern: 'interval_merge', patternCategory: 'intervals', leetCodeUrl: 'https://leetcode.com/problems/insert-interval', problem_description: 'Insert new interval merging if needed', constraints: ['0 <= intervals.length <= 10^4'], example_input: 'intervals = [[1,3],[6,9]], newInterval = [2,5]', example_output: '[[1,5],[6,9]]', hints: ['Find position', 'Merge overlapping'], solution_explanation: 'Insert and merge: O(n) time', time_complexity: 'O(n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Non-overlapping Intervals', difficulty: 'medium', topic: 'intervals', pattern: 'interval_meeting', patternCategory: 'intervals', leetCodeUrl: 'https://leetcode.com/problems/non-overlapping-intervals', problem_description: 'Min intervals to remove for no overlap', constraints: ['1 <= intervals.length <= 10^5'], example_input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', example_output: '1', hints: ['Sort by end', 'Greedy keep non-overlapping'], solution_explanation: 'Greedy: O(n log n) time', time_complexity: 'O(n log n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Meeting Rooms', difficulty: 'easy', topic: 'intervals', pattern: 'interval_meeting', patternCategory: 'intervals', leetCodeUrl: 'https://leetcode.com/problems/meeting-rooms', problem_description: 'Can attend all meetings', constraints: ['0 <= intervals.length <= 10^4'], example_input: 'intervals = [[0,30],[5,10],[15,20]]', example_output: 'false', hints: ['Sort by start', 'Check overlap'], solution_explanation: 'Sort: O(n log n) time', time_complexity: 'O(n log n)', space_complexity: 'O(1)', companies: ['Facebook'] }),
  createQ({ title: 'Meeting Rooms II', difficulty: 'medium', topic: 'intervals', pattern: 'interval_meeting', patternCategory: 'intervals', leetCodeUrl: 'https://leetcode.com/problems/meeting-rooms-ii', problem_description: 'Min meeting rooms needed', constraints: ['1 <= intervals.length <= 10^4'], example_input: 'intervals = [[0,30],[5,10],[15,20]]', example_output: '2', hints: ['Min heap for end times', 'Sweep line'], solution_explanation: 'Min heap: O(n log n) time', time_complexity: 'O(n log n)', space_complexity: 'O(n)', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Minimum Interval to Include Each Query', difficulty: 'hard', topic: 'intervals', pattern: 'interval_merge', patternCategory: 'intervals', leetCodeUrl: 'https://leetcode.com/problems/minimum-interval-to-include-each-query', problem_description: 'Min size interval containing each query', constraints: ['1 <= intervals.length <= 10^5'], example_input: 'intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]', example_output: '[3,3,1,4]', hints: ['Sort intervals and queries', 'Min heap'], solution_explanation: 'Sort + heap: O((n+q) log n) time', time_complexity: 'O((n+q) log n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Data Stream as Disjoint Intervals', difficulty: 'hard', topic: 'intervals', pattern: 'interval_merge', patternCategory: 'intervals', leetCodeUrl: 'https://leetcode.com/problems/data-stream-as-disjoint-intervals', problem_description: 'Summary of non-overlapping intervals', constraints: ['0 <= value <= 10^4'], example_input: 'addNum(1), getIntervals()', example_output: '[[1,1]]', hints: ['TreeMap or List'], solution_explanation: 'TreeMap: O(log n) time', time_complexity: 'O(log n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Remove Covered Intervals', difficulty: 'medium', topic: 'intervals', pattern: 'interval_merge', patternCategory: 'intervals', leetCodeUrl: 'https://leetcode.com/problems/remove-covered-intervals', problem_description: 'Remove intervals covered by another', constraints: ['1 <= intervals.length <= 1000'], example_input: 'intervals = [[1,4],[3,6],[2,8]]', example_output: '2', hints: ['Sort by start desc, end asc'], solution_explanation: 'Sort: O(n log n) time', time_complexity: 'O(n log n)', space_complexity: 'O(1)' }),
  createQ({ title: 'Find Right Interval', difficulty: 'medium', topic: 'intervals', pattern: 'interval_meeting', patternCategory: 'intervals', leetCodeUrl: 'https://leetcode.com/problems/find-right-interval', problem_description: 'Right interval for each interval', constraints: ['1 <= intervals.length <= 2 * 10^4'], example_input: 'intervals = [[3,4],[2,3],[1,2]]', example_output: '[-1,0,1]', hints: ['Map starts to indices', 'Binary search'], solution_explanation: 'BS: O(n log n) time', time_complexity: 'O(n log n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Interval List Intersections', difficulty: 'medium', topic: 'intervals', pattern: 'interval_merge', patternCategory: 'intervals', leetCodeUrl: 'https://leetcode.com/problems/interval-list-intersections', problem_description: 'Intersection of two interval lists', constraints: ['0 <= firstList.length, secondList.length <= 1000'], example_input: 'firstList = [[0,2],[5,10]], secondList = [[1,5],[8,12]]', example_output: '[[1,2],[5,5],[8,10]]', hints: ['Two pointers', 'Find overlap'], solution_explanation: 'Two pointers: O(n+m) time', time_complexity: 'O(n+m)', space_complexity: 'O(1)' })
];

// Additional questions to reach 200+
const additionalQuestions: PatternQuestion[] = [
  createQ({ title: 'LRU Cache', difficulty: 'medium', topic: 'design', pattern: 'lru_cache', patternCategory: 'design', leetCodeUrl: 'https://leetcode.com/problems/lru-cache', problem_description: 'Implement LRU Cache', constraints: ['1 <= capacity <= 3000'], example_input: 'LRUCache(2), put(1,1), put(2,2), get(1)', example_output: '1', hints: ['Hash map + Doubly linked list'], solution_explanation: 'Hash + DLL: O(1) per op', time_complexity: 'O(1)', space_complexity: 'O(capacity)', companies: ['Amazon', 'Facebook', 'Microsoft'] }),
  createQ({ title: 'LFU Cache', difficulty: 'hard', topic: 'design', pattern: 'design', patternCategory: 'design', leetCodeUrl: 'https://leetcode.com/problems/lfu-cache', problem_description: 'Implement LFU Cache', constraints: ['0 <= capacity <= 10^4'], example_input: 'LFUCache(2), put(1,1), put(2,2), get(1)', example_output: '1', hints: ['Multiple linked lists by freq', 'Hash maps'], solution_explanation: 'Complex design: O(1) per op', time_complexity: 'O(1)', space_complexity: 'O(capacity)' }),
  createQ({ title: 'Design Hit Counter', difficulty: 'medium', topic: 'design', pattern: 'design', patternCategory: 'design', leetCodeUrl: 'https://leetcode.com/problems/design-hit-counter', problem_description: 'Count hits in past 5 minutes', constraints: ['1 <= timestamp <= 2 * 10^9'], example_input: 'hit(1), hit(2), hit(3), getHits(4)', example_output: '3', hints: ['Circular buffer or Queue'], solution_explanation: 'Queue: O(1) per op', time_complexity: 'O(1)', space_complexity: 'O(300)' }),
  createQ({ title: 'Design Add Search Words', difficulty: 'medium', topic: 'design', pattern: 'design', patternCategory: 'design', leetCodeUrl: 'https://leetcode.com/problems/design-add-and-search-words-data-structure', problem_description: 'Add word and search with wildcard', constraints: ['1 <= word.length <= 500'], example_input: 'addWord("bad"), search("b.d")', example_output: 'true', hints: ['Trie', 'DFS for wildcard'], solution_explanation: 'Trie: O(m) for add, O(m*26^n) for search', time_complexity: 'O(m)', space_complexity: 'O(total chars)' }),
  createQ({ title: 'Implement Trie', difficulty: 'medium', topic: 'design', pattern: 'design', patternCategory: 'design', leetCodeUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree', problem_description: 'Implement prefix tree', constraints: ['1 <= word.length <= 2000'], example_input: 'insert("apple"), search("app")', example_output: 'false', hints: ['Node with children array and isEnd flag'], solution_explanation: 'Trie: O(m) per op', time_complexity: 'O(m)', space_complexity: 'O(total chars)', companies: ['Amazon', 'Facebook'] }),
  createQ({ title: 'Design Underground System', difficulty: 'medium', topic: 'design', pattern: 'design', patternCategory: 'design', leetCodeUrl: 'https://leetcode.com/problems/design-underground-system', problem_description: 'Track check-in/check-out times', constraints: ['1 <= id, t <= 10^6'], example_input: 'checkIn(45,"Leyton",3), checkOut(45,"Waterloo",15)', example_output: 'Average time', hints: ['Hash maps for check-ins and averages'], solution_explanation: 'Hash maps: O(1) per op', time_complexity: 'O(1)', space_complexity: 'O(n)' }),
  createQ({ title: 'Flatten Nested List Iterator', difficulty: 'medium', topic: 'design', pattern: 'design', patternCategory: 'design', leetCodeUrl: 'https://leetcode.com/problems/flatten-nested-list-iterator', problem_description: 'Iterator for nested list', constraints: ['1 <= nestedList.length <= 500'], example_input: '[[1,1],2,[1,1]]', example_output: '[1,1,2,1,1]', hints: ['Stack or recursion', 'Lazy loading'], solution_explanation: 'Stack: O(1) amortized per next', time_complexity: 'O(1)', space_complexity: 'O(n)' }),
  createQ({ title: 'Peeking Iterator', difficulty: 'medium', topic: 'design', pattern: 'design', patternCategory: 'design', leetCodeUrl: 'https://leetcode.com/problems/peeking-iterator', problem_description: 'Iterator with peek', constraints: ['1 <= nums.length <= 1000'], example_input: '[1,2,3]', example_output: 'peek() returns 1', hints: ['Cache next element'], solution_explanation: 'Wrapper: O(1) per op', time_complexity: 'O(1)', space_complexity: 'O(1)' }),
  createQ({ title: 'Moving Average from Data Stream', difficulty: 'easy', topic: 'design', pattern: 'fixed_window', patternCategory: 'sliding_window', leetCodeUrl: 'https://leetcode.com/problems/moving-average-from-data-stream', problem_description: 'Moving average of last n elements', constraints: ['1 <= size <= 1000'], example_input: 'MovingAverage(3), next(1), next(10)', example_output: '5.5', hints: ['Queue', 'Running sum'], solution_explanation: 'Queue: O(1) per op', time_complexity: 'O(1)', space_complexity: 'O(n)' }),
  createQ({ title: 'Logger Rate Limiter', difficulty: 'easy', topic: 'design', pattern: 'hash_set', patternCategory: 'array_string', leetCodeUrl: 'https://leetcode.com/problems/logger-rate-limiter', problem_description: 'Print message if not printed in last 10 seconds', constraints: ['0 <= timestamp <= 10^9'], example_input: 'shouldPrintMessage(1,"foo"), shouldPrintMessage(2,"bar")', example_output: 'true, true', hints: ['Hash map with last timestamp'], solution_explanation: 'Hash map: O(1) per op', time_complexity: 'O(1)', space_complexity: 'O(n)' }),
  createQ({ title: 'Snapshot Array', difficulty: 'medium', topic: 'design', pattern: 'design', patternCategory: 'design', leetCodeUrl: 'https://leetcode.com/problems/snapshot-array', problem_description: 'Array with snapshot capability', constraints: ['1 <= length <= 50000'], example_input: 'set(0,5), snap(), set(0,6), get(0,0)', example_output: '5', hints: ['Map of maps or list of changes'], solution_explanation: 'Binary search: O(log s) for get', time_complexity: 'O(log snap_id)', space_complexity: 'O(n * snap_count)' }),
  createQ({ title: 'Range Sum Query - Mutable', difficulty: 'medium', topic: 'design', pattern: 'design', patternCategory: 'design', leetCodeUrl: 'https://leetcode.com/problems/range-sum-query-mutable', problem_description: 'Range sum with updates', constraints: ['1 <= nums.length <= 3 * 10^4'], example_input: 'NumArray([1,3,5]), sumRange(0,2), update(1,2)', example_output: '9, 8', hints: ['Segment tree or Binary Indexed Tree'], solution_explanation: 'BIT: O(log n) per op', time_complexity: 'O(log n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Time Based Key-Value Store', difficulty: 'medium', topic: 'design', pattern: 'design', patternCategory: 'design', leetCodeUrl: 'https://leetcode.com/problems/time-based-key-value-store', problem_description: 'Set with timestamp, get with timestamp', constraints: ['1 <= key.length, value.length <= 100'], example_input: 'set("foo","bar",1), get("foo",1)', example_output: '"bar"', hints: ['Hash map of lists', 'Binary search'], solution_explanation: 'BS: O(log n) for get', time_complexity: 'O(1) set, O(log n) get', space_complexity: 'O(n)' }),
  createQ({ title: 'Exam Room', difficulty: 'medium', topic: 'design', pattern: 'design', patternCategory: 'design', leetCodeUrl: 'https://leetcode.com/problems/exam-room', problem_description: 'Seat students maximizing distance', constraints: ['1 <= N <= 10^9'], example_input: 'seat(), seat(), seat()', example_output: '0, 9, 4 (for N=10)', hints: ['Ordered set or TreeSet'], solution_explanation: 'TreeSet: O(log n) per op', time_complexity: 'O(log n)', space_complexity: 'O(n)' }),
  createQ({ title: 'Design File System', difficulty: 'medium', topic: 'design', pattern: 'design', patternCategory: 'design', leetCodeUrl: 'https://leetcode.com/problems/design-file-system', problem_description: 'Create path and get value', constraints: ['1 <= path.length <= 100'], example_input: 'createPath("/a",1), get("/a")', example_output: '1', hints: ['Trie with values'], solution_explanation: 'Trie: O(m) per op', time_complexity: 'O(m)', space_complexity: 'O(total paths)' }),
  createQ({ title: 'Design Browser History', difficulty: 'medium', topic: 'design', pattern: 'design', patternCategory: 'design', leetCodeUrl: 'https://leetcode.com/problems/design-browser-history', problem_description: 'Visit, back, forward operations', constraints: ['1 <= homepage.length <= 20'], example_input: 'BrowserHistory("leetcode.com"), visit("google.com")', example_output: '', hints: ['Doubly linked list or ArrayList'], solution_explanation: 'List: O(1) for visit, O(steps) for back/forward', time_complexity: 'O(1)', space_complexity: 'O(n)' })
];

// ============================================================================
// ALL QUESTIONS
// ============================================================================

export const ALL_QUESTIONS: PatternQuestion[] = [
  ...arrayQuestions,
  ...stringQuestions,
  ...binarySearchQuestions,
  ...linkedListQuestions,
  ...treeQuestions,
  ...dpQuestions,
  ...graphQuestions,
  ...heapQuestions,
  ...backtrackingQuestions,
  ...intervalQuestions,
  ...additionalQuestions
];

// Get questions by topic
export function getQuestionsByTopic(topic: string): PatternQuestion[] {
  return ALL_QUESTIONS.filter(q => q.topic === topic || q.patternCategory === topic);
}

// Get questions by pattern
export function getQuestionsByPattern(pattern: string): PatternQuestion[] {
  return ALL_QUESTIONS.filter(q => q.pattern === pattern);
}

// Get questions by difficulty
export function getQuestionsByDifficulty(difficulty: string): PatternQuestion[] {
  return ALL_QUESTIONS.filter(q => q.difficulty === difficulty);
}

// Get random question
export function getRandomQuestion(topic?: string, difficulty?: string, pattern?: string): PatternQuestion {
  let pool = ALL_QUESTIONS;
  
  if (topic && topic !== 'all') {
    pool = pool.filter(q => q.topic === topic || q.patternCategory === topic);
  }
  
  if (difficulty) {
    pool = pool.filter(q => q.difficulty === difficulty);
  }
  
  if (pattern) {
    pool = pool.filter(q => q.pattern === pattern);
  }
  
  if (pool.length === 0) {
    pool = ALL_QUESTIONS;
  }
  
  return pool[Math.floor(Math.random() * pool.length)];
}

// Get unique topics
export function getTopics(): string[] {
  return Array.from(new Set(ALL_QUESTIONS.map(q => q.topic)));
}

// Get patterns by category
export function getPatternsByCategory(categoryId: string): PatternInfo[] {
  const category = PATTERN_CATEGORIES.find(c => c.id === categoryId);
  return category?.patterns || [];
}

// Get stats
export function getQuestionBankStats(): { total: number; byDifficulty: Record<string, number>; byCategory: Record<string, number>; byPattern: Record<string, number> } {
  return {
    total: ALL_QUESTIONS.length,
    byDifficulty: {
      easy: ALL_QUESTIONS.filter(q => q.difficulty === 'easy').length,
      medium: ALL_QUESTIONS.filter(q => q.difficulty === 'medium').length,
      hard: ALL_QUESTIONS.filter(q => q.difficulty === 'hard').length
    },
    byCategory: PATTERN_CATEGORIES.reduce((acc, cat) => ({
      ...acc,
      [cat.id]: ALL_QUESTIONS.filter(q => q.patternCategory === cat.id).length
    }), {}),
    byPattern: Object.entries(NINETY_FIVE_PATTERNS).reduce((acc, [key, pattern]) => ({
      ...acc,
      [key]: ALL_QUESTIONS.filter(q => q.pattern === key).length
    }), {})
  };
}

// Search questions
export function searchQuestions(query: string): PatternQuestion[] {
  const lowerQuery = query.toLowerCase();
  return ALL_QUESTIONS.filter(q => 
    q.title.toLowerCase().includes(lowerQuery) ||
    q.pattern.toLowerCase().includes(lowerQuery) ||
    q.topic.toLowerCase().includes(lowerQuery) ||
    q.patternCategory.toLowerCase().includes(lowerQuery) ||
    q.problem_description.toLowerCase().includes(lowerQuery)
  );
}
