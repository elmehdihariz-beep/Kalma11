export function getFingerprint(): string {
  const key = 'kalma1_fp';
  let fp = localStorage.getItem(key);
  if (!fp) {
    fp = crypto.randomUUID();
    localStorage.setItem(key, fp);
  }
  return fp;
}

export function getVotedPosts(): Record<string, 'agree' | 'disagree'> {
  try {
    return JSON.parse(localStorage.getItem('kalma1_votes') || '{}');
  } catch {
    return {};
  }
}

export function saveVote(postId: string, voteType: 'agree' | 'disagree') {
  const votes = getVotedPosts();
  votes[postId] = voteType;
  localStorage.setItem('kalma1_votes', JSON.stringify(votes));
}
