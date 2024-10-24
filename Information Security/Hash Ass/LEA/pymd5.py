#!/usr/bin/python3

__doc__ = """pymd5 module - The MD5 hash function in pure Python.

md5(string='', state=None, count=0) - Returns a new md5 objects and
        processes string.  Optional advanced parameters allow you to
        resume an earlier computation by setting the internal state of
        the function and the counter of message bits processed so far.

Most of the interface matches Python's standard hashlib.

md5 objects have these methods and attributes:

 - update(arg): Update the md5 object with the string arg. Repeated calls
                are equivalent to a single call with the concatenation of all
                the arguments.
 - digest():    Return the digest of the strings passed to the update() method
                so far. This may contain non-ASCII characters, including
                NUL bytes.
 - hexdigest(): Like digest() except the digest is returned as a string of
                double length, containing only hexadecimal digits.

 - digest_size: The size of the resulting hash in bytes (16).
 - block_size:  The internal block size of the hash algorithm in bytes (64).

For example, to obtain the digest of the string 'Nobody inspects the
spammish repetition':
    >>> import pymd5
    >>> m = pymd5.md5()
    >>> m.update(b"Nobody inspects")
    >>> m.update(b" the spammish repetition")
    >>> m.digest()

More condensed:
    >>> pymd5.md5(b"Nobody inspects the spammish repetition").hexdigest()
    'bb649c83dd1ea5c9d9dec9a18df0ffe9'
"""

# Constants for compression function.
S11, S12, S13, S14 = 7, 12, 17, 22
S21, S22, S23, S24 = 5, 9, 14, 20
S31, S32, S33, S34 = 4, 11, 16, 23
S41, S42, S43, S44 = 6, 10, 15, 21

PADDING = b"\x80" + b"\x00" * 63

# F, G, H and I: basic MD5 functions.
def F(x, y, z): return (x & y) | (~x & z)
def G(x, y, z): return (x & z) | (y & ~z)
def H(x, y, z): return x ^ y ^ z
def I(x, y, z): return y ^ (x | ~z)

def ROTATE_LEFT(x, n):
    return ((x << n) | (x >> (32 - n))) & 0xffffffff

# FF, GG, HH, and II transformations for rounds 1, 2, 3, and 4.
def FF(a, b, c, d, x, s, ac):
    a += F(b, c, d) + x + ac
    a = ROTATE_LEFT(a, s) + b
    return a & 0xffffffff

def GG(a, b, c, d, x, s, ac):
    a += G(b, c, d) + x + ac
    a = ROTATE_LEFT(a, s) + b
    return a & 0xffffffff

def HH(a, b, c, d, x, s, ac):
    a += H(b, c, d) + x + ac
    a = ROTATE_LEFT(a, s) + b
    return a & 0xffffffff

def II(a, b, c, d, x, s, ac):
    a += I(b, c, d) + x + ac
    a = ROTATE_LEFT(a, s) + b
    return a & 0xffffffff


class md5:
    digest_size = 16  # size of the resulting hash in bytes
    block_size = 64   # hash algorithm's internal block size

    def __init__(self, string=b'', state=None, count=0):
        self.count = 0
        self.buffer = b''

        if state is None:
            self.state = (0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476)
        else:
            self.state = _decode(state, md5.digest_size)

        if count is not None:
            self.count = count
        if string:
            self.update(string)

    def update(self, input):
        inputLen = len(input)
        index = (self.count >> 3) & 0x3F
        self.count += (inputLen << 3)  # update number of bits
        partLen = md5.block_size - index

        if inputLen >= partLen:
            self.buffer = self.buffer[:index] + input[:partLen]
            self.state = md5_compress(self.state, self.buffer)
            i = partLen
            while i + 63 < inputLen:
                self.state = md5_compress(self.state, input[i:i + md5.block_size])
                i += md5.block_size
            index = 0
        else:
            i = 0

        self.buffer = self.buffer[:index] + input[i:inputLen]

    def digest(self):
        _buffer, _count, _state = self.buffer, self.count, self.state
        self.update(padding(self.count))
        result = self.state
        self.buffer, self.count, self.state = _buffer, _count, _state
        return _encode(result, md5.digest_size)

    def hexdigest(self):
        return self.digest().hex()


def padding(msg_bits):
    index = (msg_bits >> 3) & 0x3f
    if index < 56:
        padLen = 56 - index
    else:
        padLen = 120 - index

    return PADDING[:padLen] + _encode((msg_bits & 0xffffffff, msg_bits >> 32), 8)


def md5_compress(state, block):
    a, b, c, d = state
    x = _decode(block, md5.block_size)

    # Round 1
    a = FF(a, b, c, d, x[0], S11, 0xd76aa478)
    d = FF(d, a, b, c, x[1], S12, 0xe8c7b756)
    c = FF(c, d, a, b, x[2], S13, 0x242070db)
    b = FF(b, c, d, a, x[3], S14, 0xc1bdceee)
    a = FF(a, b, c, d, x[4], S11, 0xf57c0faf)
    d = FF(d, a, b, c, x[5], S12, 0x4787c62a)
    c = FF(c, d, a, b, x[6], S13, 0xa8304613)
    b = FF(b, c, d, a, x[7], S14, 0xfd469501)
    a = FF(a, b, c, d, x[8], S11, 0x698098d8)
    d = FF(d, a, b, c, x[9], S12, 0x8b44f7af)
    c = FF(c, d, a, b, x[10], S13, 0xffff5bb1)
    b = FF(b, c, d, a, x[11], S14, 0x895cd7be)
    a = FF(a, b, c, d, x[12], S11, 0x6b901122)
    d = FF(d, a, b, c, x[13], S12, 0xfd987193)
    c = FF(c, d, a, b, x[14], S13, 0xa679438e)
    b = FF(b, c, d, a, x[15], S14, 0x49b40821)

    # Round 2
    a = GG(a, b, c, d, x[1], S21, 0xf61e2562)
    d = GG(d, a, b, c, x[6], S22, 0xc040b340)
    c = GG(c, d, a, b, x[11], S23, 0x265e5a51)
    b = GG(b, c, d, a, x[0], S24, 0xe9b6c7aa)
    a = GG(a, b, c, d, x[5], S21, 0xd62f105d)
    d = GG(d, a, b, c, x[10], S22, 0x2441453)
    c = GG(c, d, a, b, x[15], S23, 0xd8a1e681)
    b = GG(b, c, d, a, x[4], S24, 0xe7d3fbc8)
    a = GG(a, b, c, d, x[9], S21, 0x21e1cde6)
    d = GG(d, a, b, c, x[14], S22, 0xc33707d6)
    c = GG(c, d, a, b, x[3], S23, 0xf4d50d87)
    b = GG(b, c, d, a, x[8], S24, 0x455a14ed)
    a = GG(a, b, c, d, x[13], S21, 0x0bbe0b8)
    d = GG(d, a, b, c, x[2], S22, 0x10b00001)
    c = GG(c, d, a, b, x[7], S23, 0x80808080)
    b = GG(b, c, d, a, x[12], S24, 0x7e2e5f5)

    # Round 3
    a = HH(a, b, c, d, x[5], S31, 0x3c6ef372)
    d = HH(d, a, b, c, x[8], S32, 0xa4506ceb)
    c = HH(c, d, a, b, x[11], S33, 0x40b724b)
    b = HH(b, c, d, a, x[14], S34, 0x9f157ff)
    a = HH(a, b, c, d, x[1], S31, 0x39f6b224)
    d = HH(d, a, b, c, x[4], S32, 0x3c19a121)
    c = HH(c, d, a, b, x[7], S33, 0x9d9b7e5)
    b = HH(b, c, d, a, x[10], S34, 0x6d9d1b5)
    a = HH(a, b, c, d, x[13], S31, 0xc77cd5e)
    d = HH(d, a, b, c, x[0], S32, 0x7d6d9f7)
    c = HH(c, d, a, b, x[3], S33, 0xaad57c8)
    b = HH(b, c, d, a, x[6], S34, 0x0b2f62c)
    a = HH(a, b, c, d, x[9], S31, 0x7554e3d)
    d = HH(d, a, b, c, x[12], S32, 0x57353c6)
    c = HH(c, d, a, b, x[15], S33, 0x2ca799e)
    b = HH(b, c, d, a, x[2], S34, 0x2024ab5)

    # Round 4
    a = II(a, b, c, d, x[0], S41, 0x9d77b1)
    d = II(d, a, b, c, x[7], S42, 0x3c6ef372)
    c = II(c, d, a, b, x[14], S43, 0xa4506ceb)
    b = II(b, c, d, a, x[5], S44, 0x40b724b)
    a = II(a, b, c, d, x[12], S41, 0x39f6b224)
    d = II(d, a, b, c, x[3], S42, 0x3c19a121)
    c = II(c, d, a, b, x[10], S43, 0x9d9b7e5)
    b = II(b, c, d, a, x[1], S44, 0x6d9d1b5)
    a = II(a, b, c, d, x[8], S41, 0xc77cd5e)
    d = II(d, a, b, c, x[15], S42, 0x7d6d9f7)
    c = II(c, d, a, b, x[6], S43, 0xaad57c8)
    b = II(b, c, d, a, x[13], S44, 0x0b2f62c)
    a = II(a, b, c, d, x[4], S41, 0x7554e3d)
    d = II(d, a, b, c, x[11], S42, 0x57353c6)
    c = II(c, d, a, b, x[2], S43, 0x2ca799e)
    b = II(b, c, d, a, x[9], S44, 0x2024ab5)

    return (
        (a + state[0]) & 0xffffffff,
        (b + state[1]) & 0xffffffff,
        (c + state[2]) & 0xffffffff,
        (d + state[3]) & 0xffffffff,
    )


def _decode(data, length):
    """Convert a byte string to a list of 32-bit integers."""
    return list(int.from_bytes(data[i:i + 4], 'little') for i in range(0, length, 4))


def _encode(data, length):
    """Convert a list of 32-bit integers to a byte string."""
    return b''.join(x.to_bytes(4, 'little') for x in data[:length])


if __name__ == '__main__':
    import sys
    if len(sys.argv) > 1:
        # Concatenate all arguments into a single bytes object
        input_data = b''.join(arg.encode() for arg in sys.argv[1:])
        print(md5(input_data).hexdigest())
    else:
        print("Usage: pymd5.py <string>")
