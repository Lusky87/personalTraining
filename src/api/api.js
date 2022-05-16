const API_END_POINT = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

export const request = async (nodeId) => {
    try {
        //console.log(nodeId)
        const res = await fetch(`${API_END_POINT}/${nodeId ? nodeId : ''}`)
        if (!res.ok) {
            throw new Error('서버의 상태가 이상합니다.');
        }
        return await res.json();
    } catch (e) {
        throw new Error(`오류가 발생하였습니다! ${e.message}`);
    }
            
}