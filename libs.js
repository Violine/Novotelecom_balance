function xor(src)
{
	var xor_key = '6';	
	var res="";
	for (var i = 0; i < src.length;i++)
	{
		res+=String.fromCharCode(xor_key^(src.charCodeAt(i)));
	}
	return res;
}