fetch('input04.txt')
  .then(response => response.text())
  .then(data => {
    const assignments = data.trim().split('\n').map(line => {
      const [elf1, elf2] = line.split(',').map(range => {
        const [start, end] = range.split('-').map(Number);
        return { start, end };
      });
      return { elf1, elf2 };
    });

    let overlaps = 0;
    for (let i = 0; i < assignments.length; i++) {
      const { elf1, elf2 } = assignments[i];
      if (contains(elf1, elf2)) {
        overlaps++;
      } else if (contains(elf2, elf1)) {
        overlaps++;
      }
    }

    console.log(`There are ${overlaps} pairs of assignments where one range fully contains the other.`);
  });

function contains(range1, range2) {
  return range1.start <= range2.start && range2.end <= range1.end;
}
