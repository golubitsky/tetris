# def merge_sort(arr)
#   len = arr.length

#   return arr if len <= 1

#   left = arr.take(len/2)
#   right = arr.drop(len/2)

#   merge(merge_sort(left), merge_sort(right))
# end

# def merge(left, right)

#   p "left: #{left}"
#   p "right: #{right}"

#   result = []
#   until left.empty? || right.empty?
#     if left.first < right.first
#       result << left.shift
#     else
#       p "hello"
#       result << right.shift
#       $count += left.count
#     end
#   end
#   result + left + right
# end

# arr = [1,5,4,3,2,6]
# $count = 0
# p merge_sort(arr)
# p $count

def duplicates(arr)
  duplicates = []
  counts = Hash.new(0)
  arr.each do |val|
    counts[val] += 1
    if counts[val] == 2
      duplicates << val
    end
  end

  duplicates
end

p duplicates([4,3,2,1,1,4,7,7,7])
p eval('2 + 2');

files =
{
  'a' => {
    'b'=> {
      'c'=> true
    },
    'd'=> true
  }
}

current_level = files
def traverse

end
