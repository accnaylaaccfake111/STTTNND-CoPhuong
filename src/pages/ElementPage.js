import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './ElementPage.css';
import ChemistryChatbot from '../components/ChemistryChatbot';

// Dữ liệu chi tiết cho toàn bộ 20 nguyên tố
const elements = [
  {
    atomicNumber: 1, symbol: 'H', name: 'HYDROGEN', mass: '1', valence: 'I',
    classification: 'Phi kim', position: 'Chu kì 1, nhóm IA',
    characteristics: 'Khí không màu, không mùi, nhẹ nhất trong các chất khí.',
    applications: 'Nhiên liệu tên lửa, sản xuất ammonia, bơm bóng bay.',
    ecoNote: 'Nhiên liệu sạch của tương lai. Khi cháy chỉ tạo ra nước, không phát thải khí nhà kính.',
    introVideo: 'https://www.youtube.com/embed/6rdmpx39PRk',
    reactionVideo: 'https://www.youtube.com/embed/fj4Rj8hB5B0',
    questions: [
      { q: 'Hydrogen có số hiệu nguyên tử là?', options: ['1', '2', '3', '4'], correct: '1' },
      { q: 'Nguyên tố nhẹ nhất là?', options: ['Heli', 'Hydrogen', 'Oxy', 'Carbon'], correct: 'Hydrogen' },
      { q: 'Hydrogen ở trạng thái nào ở nhiệt độ phòng?', options: ['Rắn', 'Lỏng', 'Khí', 'Plasma'], correct: 'Khí' },
      { q: 'Ký hiệu của Hydrogen là?', options: ['He', 'H', 'Hy', 'O'], correct: 'H' },
      { q: 'Hydrogen cháy trong không khí tạo thành chất gì?', options: ['CO2', 'H2O', 'H2O2', 'CH4'], correct: 'H2O' }
    ],
    story: 'Hydrogen (H) là nguyên tố đầu tiên trong bảng tuần hoàn và cũng là nguyên tố nhẹ nhất. Nó tồn tại rất nhiều trong vũ trụ, đặc biệt là trong các ngôi sao. Hydrogen thường kết hợp với Oxygen (O) để tạo thành nước. Tên “Hydrogen” trong tiếng Hy Lạp có nghĩa là “sinh ra nước”.'
  },
  {
    atomicNumber: 2, symbol: 'He', name: 'HELIUM', mass: '4', valence: '0',
    classification: 'Khí hiếm', position: 'Chu kì 1, nhóm VIIIA',
    characteristics: 'Khí không màu, không mùi, cực kỳ nhẹ và hầu như không tham gia phản ứng hóa học.',
    applications: 'Bơm bóng bay, làm mát siêu dẫn, khí thở cho thợ lặn sâu.',
    ecoNote: 'Tài nguyên không thể tái tạo trên Trái Đất. Hãy sử dụng tiết kiệm vì nó bay thẳng ra ngoài vũ trụ!',
    introVideo: 'https://www.youtube.com/embed/emBWhgUmpSg',
    reactionVideo: 'https://www.youtube.com/embed/y8NQ4Bw0KdA',
    questions: [
      { q: 'Heli có mấy electron?', options: ['1', '2', '3', '4'], correct: '2' },
      { q: 'Heli thường được dùng để làm gì?', options: ['Bơm bóng bay', 'Nhiên liệu đốt', 'Thuốc nổ', 'Sản xuất pin'], correct: 'Bơm bóng bay' },
      { q: 'Helium thuộc nhóm nguyên tố nào?', options: ['Kim loại', 'Phi kim', 'Khí hiếm', 'Halogen'], correct: 'Khí hiếm' },
      { q: 'Ký hiệu hóa học của Helium là?', options: ['H', 'He', 'Hl', 'Hm'], correct: 'He' },
      { q: 'Đặc tính hóa học nổi bật của Helium là gì?', options: ['Dễ cháy', 'Rất độc', 'Trơ, khó phản ứng', 'Ăn mòn mạnh'], correct: 'Trơ, khó phản ứng' }
    ],
    story: 'Helium (He) là loại khí rất nhẹ (chỉ sau Hydrogen) và thường được dùng để bơm bóng bay. Nó không màu, không mùi và rất “điềm tĩnh” vì gần như không phản ứng với chất khác.'
  },
  {
    atomicNumber: 3, symbol: 'Li', name: 'LITHIUM', mass: '7', valence: 'I',
    classification: 'Kim loại kiềm', position: 'Chu kì 2, nhóm IA',
    characteristics: 'Kim loại màu trắng bạc, rất mềm và nhẹ nhất, có thể nổi trên dầu hỏa.',
    applications: 'Sản xuất pin Lithium-ion cho điện thoại, xe điện, làm thuốc điều trị tâm lý.',
    ecoNote: 'Trái tim của kỷ nguyên năng lượng di động. Tái chế pin Lithium giúp giảm rác thải độc hại.',
    introVideo: '', reactionVideo: '',
    questions: [
      { q: 'Lithium là kim loại hay phi kim?', options: ['Kim loại', 'Phi kim', 'Á kim', 'Khí hiếm'], correct: 'Kim loại' },
      { q: 'Ứng dụng phổ biến nhất của Lithium là gì?', options: ['Sản xuất kính', 'Sản xuất pin', 'Xây dựng', 'Phân bón'], correct: 'Sản xuất pin' },
      { q: 'Lithium có số hiệu nguyên tử là bao nhiêu?', options: ['1', '2', '3', '4'], correct: '3' },
      { q: 'Ký hiệu hóa học của Lithium là?', options: ['L', 'Li', 'Lt', 'Lm'], correct: 'Li' },
      { q: 'Lithium phản ứng thế nào khi gặp nước?', options: ['Chìm và tan', 'Không phản ứng', 'Phản ứng mạnh, có thể bốc cháy', 'Đông đặc'], correct: 'Phản ứng mạnh, có thể bốc cháy' }
    ],
    story: 'Lithium (Li) là kim loại mềm, nhẹ và được dùng rất nhiều trong pin điện thoại, laptop và xe điện. Dù nhỏ bé nhưng nó cung cấp nguồn năng lượng mạnh mẽ.'
  },
  {
    atomicNumber: 4, symbol: 'Be', name: 'BERYLLIUM', mass: '9', valence: 'II',
    classification: 'Kim loại kiềm thổ', position: 'Chu kì 2, nhóm IIA',
    characteristics: 'Kim loại màu xám thép, cứng, nhẹ nhưng giòn ở nhiệt độ phòng.',
    applications: 'Chế tạo hợp kim cho hàng không, tàu vũ trụ, vệ tinh và linh kiện viễn thông.',
    ecoNote: 'Chìa khóa cho công nghệ hàng không vũ trụ nhờ độ cứng vững và trọng lượng siêu nhẹ.',
    introVideo: '', reactionVideo: '',
    questions: [
      { q: 'Beryllium có số hiệu nguyên tử là?', options: ['2', '3', '4', '5'], correct: '4' },
      { q: 'Beryllium thuộc nhóm kim loại nào?', options: ['Kim loại kiềm', 'Kim loại kiềm thổ', 'Kim loại chuyển tiếp', 'Đất hiếm'], correct: 'Kim loại kiềm thổ' },
      { q: 'Ứng dụng chính của Beryllium là trong lĩnh vực nào?', options: ['Y tế', 'Thực phẩm', 'Hàng không vũ trụ', 'Dệt may'], correct: 'Hàng không vũ trụ' },
      { q: 'Hóa trị của Beryllium là mấy?', options: ['I', 'II', 'III', 'IV'], correct: 'II' },
      { q: 'Ký hiệu hóa học của Beryllium là?', options: ['B', 'Be', 'Br', 'By'], correct: 'Be' }
    ],
    story: 'Beryllium (Be) là kim loại nhẹ nhưng rất cứng. Nó thường được dùng trong máy bay, tàu vũ trụ và các thiết bị hiện đại.'
  },
  {
    atomicNumber: 5, symbol: 'B', name: 'BORON', mass: '11', valence: 'III',
    classification: 'Á kim', position: 'Chu kì 2, nhóm IIIA',
    characteristics: 'Là chất rắn dạng bột màu nâu sẫm hoặc tinh thể đen, cứng chỉ sau kim cương.',
    applications: 'Sản xuất thủy tinh chịu nhiệt (Borosilicate), chất tẩy rửa, thuốc trừ sâu.',
    ecoNote: 'Làm tăng độ bền của vật liệu, giúp sản phẩm thủy tinh và kính điện thoại tuổi thọ cao hơn.',
    introVideo: '', reactionVideo: '',
    questions: [
      { q: 'Boron được phân loại là gì?', options: ['Kim loại', 'Phi kim', 'Á kim', 'Khí hiếm'], correct: 'Á kim' },
      { q: 'Số hiệu nguyên tử của Boron là bao nhiêu?', options: ['4', '5', '6', '7'], correct: '5' },
      { q: 'Ký hiệu hóa học của Boron là?', options: ['B', 'Bo', 'Br', 'Bn'], correct: 'B' },
      { q: 'Boron thường được dùng để sản xuất loại vật liệu nào?', options: ['Nhựa', 'Thủy tinh chịu nhiệt', 'Cao su', 'Giấy'], correct: 'Thủy tinh chịu nhiệt' },
      { q: 'Dạng tồn tại tinh thể của Boron có đặc điểm gì?', options: ['Mềm như sáp', 'Lỏng ở nhiệt độ phòng', 'Cứng chỉ sau kim cương', 'Dễ bay hơi'], correct: 'Cứng chỉ sau kim cương' }
    ],
    story: 'Boron (B) là nguyên tố quan trọng trong sản xuất kính chịu nhiệt và chất tẩy rửa. Nó không hẳn là kim loại cũng không hoàn toàn là phi kim.'
  },
  {
    atomicNumber: 6, symbol: 'C', name: 'CARBON', mass: '12', valence: 'II, IV',
    classification: 'Phi kim', position: 'Chu kì 2, nhóm IVA',
    characteristics: 'Tồn tại dưới nhiều dạng thù hình: than chì (mềm, đen) và kim cương (rất cứng, trong suốt).',
    applications: 'Thành phần cấu tạo cơ thể sống, nhiên liệu, lõi bút chì, đồ trang sức.',
    ecoNote: 'Nền tảng của sự sống trên Trái Đất. Bảo vệ rừng giúp cân bằng lượng Carbon trong khí quyển.',
    introVideo: '', reactionVideo: '',
    questions: [
      { q: 'Dạng thù hình nào của Carbon là vật liệu cứng nhất trong tự nhiên?', options: ['Than chì', 'Than đá', 'Kim cương', 'Graphene'], correct: 'Kim cương' },
      { q: 'Số hiệu nguyên tử của Carbon là?', options: ['4', '5', '6', '7'], correct: '6' },
      { q: 'Ký hiệu hóa học của Carbon là?', options: ['Ca', 'C', 'Co', 'Cr'], correct: 'C' },
      { q: 'Carbon có vai trò đặc biệt gì trên Trái Đất?', options: ['Làm kim loại nhẹ nhất', 'Là nền tảng của mọi sinh vật sống', 'Là khí dồi dào nhất', 'Tạo ra lực từ'], correct: 'Là nền tảng của mọi sinh vật sống' },
      { q: 'Lõi bút chì được làm từ dạng thù hình nào của Carbon?', options: ['Kim cương', 'Than củi', 'Than chì', 'Muội than'], correct: 'Than chì' }
    ],
    story: 'Carbon (C) là nguyên tố tạo nên sự sống. Nó có mặt trong cơ thể người, cây cối và gần như mọi sinh vật. Nó có thể là than chì hoặc kim cương.'
  },
  {
    atomicNumber: 7, symbol: 'N', name: 'NITROGEN', mass: '14', valence: 'III, V',
    classification: 'Phi kim', position: 'Chu kì 2, nhóm VA',
    characteristics: 'Chất khí không màu, không mùi, khá trơ về mặt hóa học ở điều kiện thường.',
    applications: 'Sản xuất phân đạm, bảo quản thực phẩm, làm mát trong y tế (Nitrogen lỏng).',
    ecoNote: 'Dinh dưỡng xanh cho thực vật, duy trì năng suất nông nghiệp toàn cầu.',
    introVideo: '', reactionVideo: '',
    questions: [
      { q: 'Nitrogen chiếm khoảng bao nhiêu % không khí Trái Đất?', options: ['21%', '50%', '78%', '90%'], correct: '78%' },
      { q: 'Số hiệu nguyên tử của Nitrogen là?', options: ['6', '7', '8', '9'], correct: '7' },
      { q: 'Ký hiệu hóa học của Nitrogen là?', options: ['Ni', 'N', 'Ne', 'Nt'], correct: 'N' },
      { q: 'Nitrogen lỏng được ứng dụng làm gì trong y tế và công nghiệp?', options: ['Tạo nhiệt lượng', 'Làm mát, làm đông nhanh', 'Diệt khuẩn', 'Phát sáng'], correct: 'Làm mát, làm đông nhanh' },
      { q: 'Nitrogen là thành phần chính để sản xuất loại phân bón nào?', options: ['Phân lân', 'Phân kali', 'Phân đạm (Urê)', 'Phân hữu cơ'], correct: 'Phân đạm (Urê)' }
    ],
    story: 'Nitrogen (N) chiếm khoảng 78% không khí Trái Đất. Đây là loại khí không màu và khá “trầm tính”.'
  },
  {
    atomicNumber: 8, symbol: 'O', name: 'OXYGEN', mass: '16', valence: 'II',
    classification: 'Phi kim', position: 'Chu kì 2, nhóm VIA',
    characteristics: 'Khí không màu, không mùi, là chất oxy hóa mạnh, cần thiết cho sự cháy.',
    applications: 'Duy trì sự hô hấp, dùng trong y tế, luyện kim và làm chất đốt hàn cắt.',
    ecoNote: 'Hơi thở của hành tinh. Hãy bảo vệ thảm thực vật để duy trì nguồn dưỡng khí này.',
    introVideo: '', reactionVideo: '',
    questions: [
      { q: 'Ký hiệu hóa học của Oxygen là?', options: ['Ox', 'O', 'Om', 'Oy'], correct: 'O' },
      { q: 'Số hiệu nguyên tử của Oxygen là bao nhiêu?', options: ['6', '7', '8', '9'], correct: '8' },
      { q: 'Oxygen chiếm khoảng bao nhiêu % thể tích không khí?', options: ['21%', '50%', '78%', '10%'], correct: '21%' },
      { q: 'Quá trình nào trong tự nhiên ĐÒI HỎI phải có Oxygen?', options: ['Sự quang hợp', 'Sự cháy và hô hấp', 'Sự bay hơi', 'Sự đông đặc'], correct: 'Sự cháy và hô hấp' },
      { q: 'Oxygen kết hợp với Hydrogen sẽ tạo ra hợp chất phổ biến nào?', options: ['Đường', 'Muối', 'Nước (H2O)', 'Ozone'], correct: 'Nước (H2O)' }
    ],
    story: 'Oxygen (O) là nguyên tố cần thiết cho sự hô hấp của con người và động vật. Lửa cháy được là nhờ Oxygen hỗ trợ quá trình cháy đó nha!'
  },
  {
    atomicNumber: 9, symbol: 'F', name: 'FLUORINE', mass: '19', valence: 'I',
    classification: 'Phi kim (Halogen)', position: 'Chu kì 2, nhóm VIIA',
    characteristics: 'Khí màu vàng nhạt, có mùi hăng và là phi kim hoạt động mạnh nhất.',
    applications: 'Sản xuất kem đánh răng ngừa sâu răng, chế tạo chất chống dính Teflon.',
    ecoNote: 'Chiến binh bảo vệ men răng. Hợp chất của nó giúp cải thiện chất lượng cuộc sống hàng ngày.',
    introVideo: '', reactionVideo: '',
    questions: [
      { q: 'Fluorine có hóa trị mấy?', options: ['I', 'II', 'III', 'IV'], correct: 'I' },
      { q: 'Fluorine thuộc nhóm nguyên tố nào?', options: ['Khí hiếm', 'Kim loại kiềm', 'Halogen', 'Á kim'], correct: 'Halogen' },
      { q: 'Sản phẩm tiêu dùng nào thường chứa hợp chất của Fluorine để bảo vệ sức khỏe?', options: ['Nước rửa chén', 'Kem đánh răng', 'Dầu gội', 'Nước hoa'], correct: 'Kem đánh răng' },
      { q: 'Số hiệu nguyên tử của Fluorine là?', options: ['7', '8', '9', '10'], correct: '9' },
      { q: 'Ký hiệu hóa học của Fluorine là?', options: ['Fl', 'F', 'Fo', 'Fu'], correct: 'F' }
    ],
    story: 'Fluorine (F) là phi kim hoạt động hóa học mạnh nhất. Nó thường xuất hiện trong kem đánh răng để bảo vệ răng.'
  },
  {
    atomicNumber: 10, symbol: 'Ne', name: 'NEON', mass: '20', valence: '0',
    classification: 'Khí hiếm', position: 'Chu kì 2, nhóm VIIIA',
    characteristics: 'Khí không màu, khi được kích thích bằng điện sẽ phát ra ánh sáng đỏ cam rực rỡ.',
    applications: 'Chế tạo bóng đèn quảng cáo (đèn neon), laser, thiết bị chỉ thị điện áp.',
    ecoNote: 'Thắp sáng màn đêm đô thị bằng những tia sáng rực rỡ và bền bỉ.',
    introVideo: '', reactionVideo: '',
    questions: [
      { q: 'Khi có dòng điện chạy qua, khí Neon phát sáng màu gì?', options: ['Xanh dương', 'Tím', 'Đỏ cam', 'Trắng'], correct: 'Đỏ cam' },
      { q: 'Neon thuộc nhóm nguyên tố nào?', options: ['Khí hiếm', 'Kim loại', 'Halogen', 'Phi kim'], correct: 'Khí hiếm' },
      { q: 'Số hiệu nguyên tử của Neon là bao nhiêu?', options: ['8', '9', '10', '11'], correct: '10' },
      { q: 'Ký hiệu hóa học của Neon là?', options: ['N', 'Ne', 'No', 'Ni'], correct: 'Ne' },
      { q: 'Neon thường được ứng dụng để làm gì?', options: ['Bơm khinh khí cầu', 'Làm mát', 'Làm bảng đèn quảng cáo', 'Sản xuất phân bón'], correct: 'Làm bảng đèn quảng cáo' }
    ],
    story: 'Neon là khí hiếm thường được dùng trong các bảng đèn quảng cáo phát sáng. Khi có dòng điện chạy qua, Neon phát ra ánh sáng đỏ cam rực rỡ.'
  },
  {
    atomicNumber: 11, symbol: 'Na', name: 'SODIUM', mass: '23', valence: 'I',
    classification: 'Kim loại kiềm', position: 'Chu kì 3, nhóm IA',
    characteristics: 'Kim loại màu trắng bạc, rất mềm, có thể cắt bằng dao, phản ứng nổ với nước.',
    applications: 'Thành phần muối ăn (NaCl), đèn cao áp, điều hòa chất lỏng trong cơ thể.',
    ecoNote: 'Hợp chất muối ăn là gia vị không thể thiếu, duy trì sự cân bằng của cơ thể sống.',
    introVideo: '', reactionVideo: '',
    questions: [
      { q: 'Sodium phản ứng với nước sẽ gây ra hiện tượng gì?', options: ['Tan im lặng', 'Kết tủa', 'Phát nổ, bốc cháy', 'Đông đá'], correct: 'Phát nổ, bốc cháy' },
      { q: 'Sodium là thành phần chính trong loại gia vị nào?', options: ['Đường', 'Mì chính', 'Muối ăn (NaCl)', 'Tiêu'], correct: 'Muối ăn (NaCl)' },
      { q: 'Ký hiệu hóa học của Sodium là?', options: ['So', 'Sa', 'Na', 'Nd'], correct: 'Na' },
      { q: 'Số hiệu nguyên tử của Sodium là?', options: ['10', '11', '12', '13'], correct: '11' },
      { q: 'Sodium thuộc nhóm kim loại nào?', options: ['Kim loại kiềm', 'Kim loại kiềm thổ', 'Kim loại màu', 'Kim loại quý'], correct: 'Kim loại kiềm' }
    ],
    story: 'Sodium (Na) là kim loại mềm và là thành phần quan trọng trong muối ăn. Khi cho Sodium nguyên chất vào nước, nó phản ứng mạnh đến mức có thể phát nổ.'
  },
  {
    atomicNumber: 12, symbol: 'Mg', name: 'MAGNESIUM', mass: '24', valence: 'II',
    classification: 'Kim loại kiềm thổ', position: 'Chu kì 3, nhóm IIA',
    characteristics: 'Kim loại màu xám bạc, nhẹ, cháy trong không khí phát ra ánh sáng trắng chói lóa.',
    applications: 'Tạo hợp kim nhẹ cho ô tô/máy bay, thành phần pháo sáng, cần thiết cho cơ bắp.',
    ecoNote: 'Vật liệu xanh cho ngành giao thông, giúp giảm trọng lượng xe và tiết kiệm nhiên liệu.',
    introVideo: '', reactionVideo: '',
    questions: [
      { q: 'Magnesium cháy tạo ra ánh sáng màu gì?', options: ['Vàng', 'Trắng chói', 'Xanh lục', 'Đỏ'], correct: 'Trắng chói' },
      { q: 'Số hiệu nguyên tử của Magnesium là?', options: ['11', '12', '13', '14'], correct: '12' },
      { q: 'Ký hiệu hóa học của Magnesium là?', options: ['Ma', 'Mg', 'Mn', 'Ms'], correct: 'Mg' },
      { q: 'Trong cơ thể người, Magnesium rất cần thiết cho cơ quan nào?', options: ['Mắt', 'Tóc', 'Cơ bắp và hệ thần kinh', 'Phổi'], correct: 'Cơ bắp và hệ thần kinh' },
      { q: 'Magnesium thuộc nhóm nào trong bảng tuần hoàn?', options: ['Kim loại kiềm', 'Kim loại kiềm thổ', 'Khí hiếm', 'Halogen'], correct: 'Kim loại kiềm thổ' }
    ],
    story: 'Magnesium (Mg) là kim loại nhẹ nhưng khá bền, thường dùng để chế tạo hợp kim. Khi cháy, Magnesium phát ra ánh sáng trắng cực chói.'
  },
  {
    atomicNumber: 13, symbol: 'Al', name: 'ALUMINUM', mass: '27', valence: 'III',
    classification: 'Kim loại', position: 'Chu kì 3, nhóm IIIA',
    characteristics: 'Nhẹ, màu trắng bạc, dẫn nhiệt và điện tốt, có lớp màng oxit bảo vệ chống gỉ.',
    applications: 'Làm vỏ lon, khung cửa, nồi chảo, lõi dây điện, vật liệu hàng không.',
    ecoNote: 'Vua tái chế! Tái chế nhôm giúp tiết kiệm đến 95% năng lượng so với sản xuất mới.',
    introVideo: '', reactionVideo: '',
    questions: [
      { q: 'Aluminum có khả năng tái chế tốt không?', options: ['Rất khó tái chế', 'Chỉ tái chế được 1 lần', 'Có khả năng tái chế rất tốt', 'Không thể tái chế'], correct: 'Có khả năng tái chế rất tốt' },
      { q: 'Ký hiệu hóa học của Aluminum là?', options: ['Am', 'Al', 'Au', 'An'], correct: 'Al' },
      { q: 'Số hiệu nguyên tử của Aluminum là bao nhiêu?', options: ['12', '13', '14', '15'], correct: '13' },
      { q: 'Hóa trị đặc trưng của Aluminum là mấy?', options: ['I', 'II', 'III', 'IV'], correct: 'III' },
      { q: 'Một đặc tính nổi bật của Aluminum giúp nó được dùng làm cửa sổ và máy bay là gì?', options: ['Rất nặng', 'Nhẹ và có màng oxit chống gỉ', 'Dễ vỡ', 'Trong suốt'], correct: 'Nhẹ và có màng oxit chống gỉ' }
    ],
    story: 'Aluminum - nhôm (Al) là kim loại nhẹ, chống gỉ tốt và dễ tái chế. Nó được dùng rất nhiều trong lon nước ngọt, giấy bạc, xe cộ.'
  },
  {
    atomicNumber: 14, symbol: 'Si', name: 'SILICON', mass: '28', valence: 'IV',
    classification: 'Á kim', position: 'Chu kì 3, nhóm IVA',
    characteristics: 'Chất rắn tinh thể màu xám sẫm có ánh kim, là một chất bán dẫn.',
    applications: 'Chế tạo vi mạch (chip), pin năng lượng mặt trời, sản xuất thủy tinh, silicone.',
    ecoNote: 'Trái tim của cuộc cách mạng số và năng lượng mặt trời, thân thiện với môi trường.',
    introVideo: '', reactionVideo: '',
    questions: [
      { q: 'Silicon cực kỳ quan trọng trong ngành công nghiệp nào?', options: ['Dệt may', 'Thực phẩm', 'Công nghệ (Vi mạch/Chip)', 'Đồ gỗ'], correct: 'Công nghệ (Vi mạch/Chip)' },
      { q: 'Số hiệu nguyên tử của Silicon là?', options: ['13', '14', '15', '16'], correct: '14' },
      { q: 'Ký hiệu hóa học của Silicon là?', options: ['Sl', 'Si', 'So', 'Sn'], correct: 'Si' },
      { q: 'Ngoài tự nhiên, Silicon tồn tại rất nhiều trong vật liệu nào?', options: ['Trong không khí', 'Trong nước biển', 'Trong cát và đá', 'Trong cây xanh'], correct: 'Trong cát và đá' },
      { q: 'Về tính chất dẫn điện, Silicon được gọi là gì?', options: ['Chất cách điện', 'Chất siêu dẫn', 'Chất bán dẫn', 'Chất dẫn điện tốt'], correct: 'Chất bán dẫn' }
    ],
    story: 'Silicon (Si) là nguyên tố cực kỳ quan trọng trong công nghệ hiện đại. Nó được dùng để sản xuất chip điện tử, máy tính và điện thoại.'
  },
  {
    atomicNumber: 15, symbol: 'P', name: 'PHOSPHORUS', mass: '31', valence: 'III, V',
    classification: 'Phi kim', position: 'Chu kì 3, nhóm VA',
    characteristics: 'Tồn tại dưới dạng P trắng (tự bốc cháy) và P đỏ (ít độc hại hơn, dùng làm diêm).',
    applications: 'Sản xuất phân lân (NPK), diêm quẹt, thuốc trừ sâu, và là cấu tạo của DNA.',
    ecoNote: 'Nền tảng của năng lượng tế bào (ATP), nuôi dưỡng sự sinh trưởng của thực vật.',
    introVideo: '', reactionVideo: '',
    questions: [
      { q: 'Phosphorus được dùng làm nguyên liệu chính sản xuất loại phân bón nào?', options: ['Phân đạm', 'Phân lân', 'Phân kali', 'Phân hữu cơ'], correct: 'Phân lân' },
      { q: 'Ký hiệu hóa học của Phosphorus là?', options: ['Ph', 'Po', 'P', 'Pr'], correct: 'P' },
      { q: 'Số hiệu nguyên tử của Phosphorus là?', options: ['14', '15', '16', '17'], correct: '15' },
      { q: 'Phosphorus đỏ thường xuất hiện ở vật dụng nào hằng ngày?', options: ['Ruột bút chì', 'Đầu que diêm', 'Kem đánh răng', 'Bóng đèn'], correct: 'Đầu que diêm' },
      { q: 'Trong cơ thể người, Phosphorus tham gia cấu tạo nên cái gì?', options: ['Tóc và móng', 'Da', 'Xương, răng và DNA', 'Nước bọt'], correct: 'Xương, răng và DNA' }
    ],
    story: 'Phosphorus (P) rất cần cho cơ thể sống vì nó tham gia tạo xương, răng và DNA. Đây là nguyên tố quan trọng trong phân bón giúp cây phát triển.'
  },
  {
    atomicNumber: 16, symbol: 'S', name: 'SULFUR', mass: '32', valence: 'II, IV, VI',
    classification: 'Phi kim', position: 'Chu kì 3, nhóm VIA',
    characteristics: 'Chất rắn màu vàng tươi, dễ vụn, khi cháy sinh ra khí có mùi hắc đặc trưng.',
    applications: 'Sản xuất acid sulfuric, lưu hóa cao su, chế tạo thuốc súng, thuốc diệt nấm.',
    ecoNote: 'Nguyên liệu công nghiệp cốt lõi, nhưng khí thải của nó cần kiểm soát để tránh mưa acid.',
    introVideo: '', reactionVideo: '',
    questions: [
      { q: 'Sulfur nguyên chất tồn tại ở trạng thái rắn có màu gì?', options: ['Trắng', 'Đỏ', 'Vàng tươi', 'Đen'], correct: 'Vàng tươi' },
      { q: 'Ký hiệu hóa học của Sulfur là?', options: ['Su', 'Sf', 'S', 'Sl'], correct: 'S' },
      { q: 'Số hiệu nguyên tử của Sulfur là bao nhiêu?', options: ['15', '16', '17', '18'], correct: '16' },
      { q: 'Khi cháy, hợp chất khí sinh ra của Sulfur có mùi đặc trưng gì?', options: ['Mùi thơm', 'Mùi hắc/Trứng thối', 'Không mùi', 'Mùi khai'], correct: 'Mùi hắc/Trứng thối' },
      { q: 'Trong tự nhiên, Sulfur thường được tìm thấy nhiều nhất ở đâu?', options: ['Băng giá', 'Đại dương', 'Gần núi lửa', 'Trong không khí'], correct: 'Gần núi lửa' }
    ],
    story: 'Sulfur là phi kim màu vàng nổi bật, thường xuất hiện gần núi lửa. Hợp chất của Sulfur chính là thủ phạm gây ra mùi trứng thối.'
  },
  {
    atomicNumber: 17, symbol: 'Cl', name: 'CHLORINE', mass: '35.5', valence: 'I',
    classification: 'Phi kim (Halogen)', position: 'Chu kì 3, nhóm VIIA',
    characteristics: 'Khí màu vàng lục nhạt, có mùi hắc, nặng hơn không khí và rất độc nếu hít trực tiếp.',
    applications: 'Khử trùng nước máy/hồ bơi, sản xuất nhựa PVC, chất tẩy trắng.',
    ecoNote: 'Lá chắn y tế cộng đồng, giúp bảo vệ nguồn nước sạch khỏi các mầm bệnh nguy hiểm.',
    introVideo: '', reactionVideo: '',
    questions: [
      { q: 'Ứng dụng phổ biến nhất của Chlorine trong đời sống là gì?', options: ['Làm kẹo', 'Khử trùng nước', 'Bơm lốp xe', 'Làm mát'], correct: 'Khử trùng nước' },
      { q: 'Ký hiệu hóa học của Chlorine là?', options: ['Ch', 'Cl', 'Cr', 'Ce'], correct: 'Cl' },
      { q: 'Số hiệu nguyên tử của Chlorine là?', options: ['16', '17', '18', '19'], correct: '17' },
      { q: 'Chlorine ở trạng thái khí có màu sắc như thế nào?', options: ['Không màu', 'Xanh dương', 'Vàng lục nhạt', 'Đen'], correct: 'Vàng lục nhạt' },
      { q: 'Chlorine thuộc nhóm nguyên tố nào?', options: ['Khí hiếm', 'Kim loại', 'Á kim', 'Halogen'], correct: 'Halogen' }
    ],
    story: 'Chlorine là khí màu vàng lục nhạt với mùi rất mạnh. Nó thường được dùng để làm sạch nước hồ bơi và tiêu diệt vi khuẩn.'
  },
  {
    atomicNumber: 18, symbol: 'Ar', name: 'ARGON', mass: '40', valence: '0',
    classification: 'Khí hiếm', position: 'Chu kì 3, nhóm VIIIA',
    characteristics: 'Khí không màu, không mùi, hoàn toàn trơ và không duy trì sự sống/sự cháy.',
    applications: 'Bơm vào bóng đèn sợi đốt để ngăn dây tóc bị oxy hóa, khí bảo vệ trong hàn kim loại.',
    ecoNote: 'Lớp áo giáp vô hình bảo vệ các kim loại nóng chảy khỏi tác động của không khí.',
    introVideo: '', reactionVideo: '',
    questions: [
      { q: 'Argon thuộc nhóm nguyên tố nào?', options: ['Khí hiếm', 'Kim loại kiềm', 'Halogen', 'Á kim'], correct: 'Khí hiếm' },
      { q: 'Số hiệu nguyên tử của Argon là bao nhiêu?', options: ['16', '17', '18', '19'], correct: '18' },
      { q: 'Ký hiệu hóa học của Argon là?', options: ['Ag', 'Ar', 'An', 'Ao'], correct: 'Ar' },
      { q: 'Argon thường được bơm vào đâu để ngăn chặn sự oxy hóa?', options: ['Bánh xe', 'Bóng đèn sợi đốt', 'Khinh khí cầu', 'Bình chữa cháy'], correct: 'Bóng đèn sợi đốt' },
      { q: 'Tên gọi "Argon" bắt nguồn từ tiếng Hy Lạp mang ý nghĩa gì?', options: ['Lười biếng/Không hoạt động', 'Tỏa sáng', 'Mùi hôi', 'Sự sống'], correct: 'Lười biếng/Không hoạt động' }
    ],
    story: 'Argon (Ar) là khí hiếm, không màu và hầu như không phản ứng với chất khác. Tên “Argon” nghĩa là “lười biếng” vì nó rất ít phản ứng.'
  },
  {
    atomicNumber: 19, symbol: 'K', name: 'POTASSIUM', mass: '39', valence: 'I',
    classification: 'Kim loại kiềm', position: 'Chu kì 4, nhóm IA',
    characteristics: 'Màu trắng bạc, mềm, bốc cháy tạo ngọn lửa màu tím nhạt khi tiếp xúc với nước.',
    applications: 'Sản xuất phân bón Kali cho cây trồng, chất thay thế muối, cần thiết cho nhịp tim.',
    ecoNote: 'Nguyên tố vàng cho nông nghiệp, giúp thực vật chống chịu khô hạn và sâu bệnh.',
    introVideo: '', reactionVideo: '',
    questions: [
      { q: 'Potassium nguyên chất khi gặp nước sẽ bốc cháy ngọn lửa màu gì?', options: ['Đỏ rực', 'Xanh lục', 'Tím nhạt', 'Vàng chói'], correct: 'Tím nhạt' },
      { q: 'Số hiệu nguyên tử của Potassium là?', options: ['18', '19', '20', '21'], correct: '19' },
      { q: 'Ký hiệu hóa học của Potassium là?', options: ['Po', 'Pt', 'K', 'P'], correct: 'K' },
      { q: 'Potassium thuộc nhóm nguyên tố nào?', options: ['Khí hiếm', 'Kim loại kiềm', 'Phi kim', 'Halogen'], correct: 'Kim loại kiềm' },
      { q: 'Trong cơ thể, Potassium có vai trò cực kỳ quan trọng đối với cơ quan nào?', options: ['Dạ dày', 'Da', 'Nhịp tim và thần kinh', 'Thị lực'], correct: 'Nhịp tim và thần kinh' }
    ],
    story: 'Potassium (K) là kim loại mềm màu bạc và cực kỳ quan trọng cho cơ thể. Potassium kim loại gặp nước sẽ phản ứng dữ dội, thậm chí bốc cháy tím.'
  },
  {
    atomicNumber: 20, symbol: 'Ca', name: 'CALCIUM', mass: '40', valence: 'II',
    classification: 'Kim loại kiềm thổ', position: 'Chu kì 4, nhóm IIA',
    characteristics: 'Kim loại xám bạc, tương đối cứng. Hợp chất tự nhiên rất phổ biến (đá vôi).',
    applications: 'Thành phần của xi măng, thạch cao, quan trọng cho sự phát triển của xương và răng.',
    ecoNote: 'Bộ khung vững chắc của sự sống và là vật liệu nền tảng xây dựng nên nền văn minh.',
    introVideo: '', reactionVideo: '',
    questions: [
      { q: 'Calcium tập trung nhiều nhất ở đâu trong cơ thể người?', options: ['Da', 'Mắt', 'Xương và răng', 'Tóc'], correct: 'Xương và răng' },
      { q: 'Số hiệu nguyên tử của Calcium là bao nhiêu?', options: ['18', '19', '20', '21'], correct: '20' },
      { q: 'Ký hiệu hóa học của Calcium là?', options: ['C', 'Cl', 'Ca', 'Cu'], correct: 'Ca' },
      { q: 'Hợp chất phổ biến nhất của Calcium ngoài tự nhiên là gì?', options: ['Cát', 'Đá vôi', 'Than đá', 'Muối mỏ'], correct: 'Đá vôi' },
      { q: 'Calcium thuộc nhóm kim loại nào?', options: ['Kim loại kiềm', 'Kim loại kiềm thổ', 'Kim loại quý', 'Đất hiếm'], correct: 'Kim loại kiềm thổ' }
    ],
    story: 'Calcium (Ca) là khoáng chất quen thuộc giúp xương và răng chắc khỏe. Ngoài cơ thể người, Calcium còn có trong đá vôi, vỏ sò.'
  }
];

// Hàm tính số electron trên mỗi lớp (dành cho 20 nguyên tố đầu tiên)
const getElectronShells = (z) => {
  if (z <= 2) return [z];
  if (z <= 10) return [2, z - 2];
  if (z <= 18) return [2, 8, z - 10];
  return [2, 8, 8, z - 18];
};

// Component con vẽ Mô hình nguyên tử bằng SVG
const AtomModel = ({ atomicNumber, symbol }) => {
  const shells = getElectronShells(atomicNumber);
  const center = 85; 
  const ringRadii = [28, 45, 62, 79]; 

  return (
    <div className="atom-svg-container">
      <svg viewBox="0 0 170 170" width="100%" height="100%">
        {/* Hạt nhân */}
        <circle cx={center} cy={center} r="16" fill="#38bdf8" />
        <text 
          x={center} y={center} 
          fill="white" fontSize="14" fontWeight="bold" 
          textAnchor="middle" dominantBaseline="central"
        >
          {symbol}
        </text>

        {/* Các lớp vỏ và Electron (Có hiệu ứng xoay nhẹ nhàng) */}
        <g className="atom-spin">
          {shells.map((electronCount, shellIndex) => {
            const r = ringRadii[shellIndex];
            return (
              <g key={`shell-${shellIndex}`}>
                {/* Vòng quỹ đạo */}
                <circle cx={center} cy={center} r={r} fill="none" stroke="#0284c7" strokeWidth="2.5" />
                
                {/* Dải hạt Electron */}
                {Array.from({ length: electronCount }).map((_, eIndex) => {
                  const angle = (eIndex / electronCount) * 2 * Math.PI - Math.PI / 2;
                  const ex = center + r * Math.cos(angle);
                  const ey = center + r * Math.sin(angle);
                  return (
                    <circle key={`e-${shellIndex}-${eIndex}`} cx={ex} cy={ey} r="4.5" fill="#ef4444" />
                  );
                })}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

const ElementPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedElement, setSelectedElement] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const element = elements.find(el => el.atomicNumber === parseInt(id));
      if (element) {
        setSelectedElement(element);
        setModalOpen(true);
        setQuizAnswers({});
        setQuizSubmitted(false);
      } else {
        navigate('/nguyen-to');
      }
    } else {
      if (modalOpen) {
        setModalOpen(false);
        setSelectedElement(null);
      }
    }
  }, [id, navigate, modalOpen]);

  const openModal = (element) => {
    setSelectedElement(element);
    setModalOpen(true);
    setQuizAnswers({});
    setQuizSubmitted(false);
    navigate(`/nguyen-to/${element.atomicNumber}`, { replace: true });
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedElement(null);
    navigate('/nguyen-to', { replace: true });
  };

  const handleAnswerChange = (qIndex, value) => {
    setQuizAnswers({ ...quizAnswers, [qIndex]: value });
  };

  const handleQuizSubmit = () => setQuizSubmitted(true);

  const calculateScore = () => {
    if (!selectedElement) return 0;
    let correct = 0;
    selectedElement.questions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) correct++;
    });
    return correct;
  };

  // Hàm phân loại nhóm để cấp màu (Gộp Á kim vào Phi kim)
  const getGroupClass = (classification) => {
    if (classification.includes('Kim loại')) return 'group-metal';
    if (classification.includes('Phi kim') || classification.includes('Á kim')) return 'group-nonmetal'; 
    if (classification.includes('Khí hiếm')) return 'group-noble';
    return '';
  };

  return (
    <div className="element-page-container">
      <header className="element-header">
        <h1>BẢNG NGUYÊN TỐ</h1>
        <p>Mỗi thẻ đại diện cho một nguyên tố – Bấm vào thẻ để xem thông tin chi tiết</p>
        <Link to="/" className="back-home">← Về trang chủ</Link>
      </header>

      {/* Grid danh sách 20 nguyên tố - Tích hợp hàm đổi màu */}
      <div className="elements-grid">
        {elements.map((el, index) => (
          <div 
            className={`element-card ${getGroupClass(el.classification)}`} 
            key={el.atomicNumber} 
            onClick={() => openModal(el)}
            style={{ animationDelay: `${index * 0.05}s` }} 
          >
            <div className="atomic-number">{el.atomicNumber}</div>
            <div className="symbol">{el.symbol}</div>
            <div className="element-name">{el.name}</div>
          </div>
        ))}
      </div>

      {/* Khung Modal hiển thị chi tiết */}
      {modalOpen && selectedElement && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content-wide" onClick={(e) => e.stopPropagation()}>
            <button className="modal-back-btn" onClick={closeModal}>← Quay lại</button>

            <div className="modal-body-wide">
              
              <div className="id-card-wrapper">
                <div className="id-card-header">
                  <h2>THẺ ĐỊNH DANH NGUYÊN TỐ</h2>
                </div>

                <div className="id-card-main">
                  <div className="id-card-avatar">
                    <div className="avatar-placeholder">
                      {selectedElement.symbol}
                      <br/><span>Mascot</span>
                    </div>
                  </div>

                  <div className="id-card-info">
                    <div className="info-row-top">
                      <span className="info-label">Số hiệu nguyên tử:</span>
                      <span className="info-badge">{selectedElement.atomicNumber}</span>
                    </div>
                    
                    <div className="info-name-symbol">
                      <div className="name-box">
                        <div className="info-label">Tên nguyên tố:</div>
                        <div className="element-title">{selectedElement.name}</div>
                      </div>
                      <div className="symbol-box">
                        <div className="info-label">Kí hiệu hóa học:</div>
                        <div className="element-symbol-large">{selectedElement.symbol}</div>
                      </div>
                    </div>

                    <div className="info-details">
                      <p><strong>Khối lượng nguyên tử:</strong> {selectedElement.mass} amu</p>
                      <div className="info-row-split">
                        <p><strong>Hóa trị:</strong> {selectedElement.valence}</p>
                        <p><strong>Phân loại:</strong> {selectedElement.classification}</p>
                      </div>
                      <p><strong>Vị trí nguyên tố:</strong> {selectedElement.position}</p>
                    </div>
                  </div>

                  {/* Cột phải: GỌI COMPONENT MÔ HÌNH VÀO ĐÂY */}
                  <div className="id-card-model">
                    <AtomModel 
                      atomicNumber={selectedElement.atomicNumber} 
                      symbol={selectedElement.symbol} 
                    />
                  </div>
                </div>

                <div className="id-card-footer">
                  <p><strong>Đặc điểm nhận dạng:</strong> {selectedElement.characteristics}</p>
                  <p><strong>Ứng dụng thực tế:</strong> {selectedElement.applications}</p>
                  <div className="eco-quote">
                    “{selectedElement.ecoNote}” 🌍
                  </div>
                </div>

                <div className="videos-row">
                  <div className="video-col">
                    <h3>📺 Video giới thiệu</h3>
                    {selectedElement.introVideo ? (
                      <iframe src={selectedElement.introVideo} title="Intro" frameBorder="0" allowFullScreen></iframe>
                    ) : (
                      <p>🎬 Video giới thiệu đang được cập nhật.</p>
                    )}
                  </div>
                  <div className="video-col">
                    <h3>⚡ Video phản ứng đặc trưng</h3>
                    {selectedElement.reactionVideo ? (
                      <iframe src={selectedElement.reactionVideo} title="Reaction" frameBorder="0" allowFullScreen></iframe>
                    ) : (
                      <p>⚗️ Video phản ứng đang được cập nhật.</p>
                    )}
                  </div>
                </div>
              </div>

              <section className="content-section">
                <h3>📖 Câu chuyện về nguyên tố</h3>
                <p>{selectedElement.story}</p>
              </section>

              <section className="content-section">
                <h3>📝 Kiểm tra kiến thức</h3>
                <div className="quiz-container-wide">
                  {selectedElement.questions.map((q, idx) => (
                    <div key={idx} className="quiz-question-wide">
                      <p><strong>Câu {idx+1}:</strong> {q.q}</p>
                      <div className="quiz-options-wide">
                        {q.options.map((opt, optIdx) => (
                          <label key={optIdx}>
                            <input
                              type="radio"
                              name={`q${idx}`}
                              value={opt}
                              onChange={(e) => handleAnswerChange(idx, e.target.value)}
                              disabled={quizSubmitted}
                            /> {opt}
                          </label>
                        ))}
                      </div>
                      {quizSubmitted && (
                        <div className="quiz-feedback-wide" style={{ color: quizAnswers[idx] === q.correct ? '#10b981' : '#ef4444' }}>
                          {quizAnswers[idx] === q.correct ? '✅ Chính xác!' : `❌ Sai (Đáp án đúng: ${q.correct})`}
                        </div>
                      )}
                    </div>
                  ))}
                  {!quizSubmitted ? (
                    <button className="quiz-submit-wide" onClick={handleQuizSubmit}>Nộp bài</button>
                  ) : (
                    <div className="quiz-score-wide">
                      Bạn trả lời đúng {calculateScore()}/{selectedElement.questions.length} câu.
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
      {/* chatbot */}
      <ChemistryChatbot />
    </div>
  );
};

export default ElementPage;